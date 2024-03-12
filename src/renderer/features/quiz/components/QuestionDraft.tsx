import { useAppDispatch, useAppSelector } from '@/hooks';
import React from 'react';
import {
  answerAdded,
  questionAnswersCleared,
  questionRemoved,
  questionTitleChanged,
  selectQuestions,
} from '../slices';
import { Button, IconButton, TextField } from '@mui/material';
import {
  Delete as DeleteIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from '@mui/icons-material';
import { AnswerDraft } from './AnswerDraft';
import { FieldArray, getIn, useFormikContext } from 'formik';
import {  QuizFormValues } from '../types';

interface Props {
  index: number;
  onRemove?: () => void;
}

export const QuestionDraft = ({ index, onRemove }: Props) => {
  const name = `questions[${index}]`;
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(selectQuestions)[index];

  const { values, errors, handleChange, handleBlur, setFieldValue } =
    useFormikContext<QuizFormValues>();
  const { title, answers } = values.questions[index];

  const error = getIn(errors, `${name}.title`);

  const handleRemove = () => {
    if (typeof onRemove === 'function') {
      onRemove();
    }
    dispatch(questionAnswersCleared(id));
    dispatch(questionRemoved(id));
  };

  const handleAddAnswer = () => {
    setFieldValue(`${name}.answers`, [...answers, '']);
    dispatch(answerAdded(id));
  };

  return (
    <div className="flex flex-col space-y-3 border-b-[1.5px] border-gray-200 py-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium font-sans">{`Сұрақ ${
          index + 1
        }`}</h2>
        <IconButton onClick={handleRemove}>
          <DeleteIcon color="error" />
        </IconButton>
      </div>
      <TextField
        error={Boolean(error)}
        value={title}
        label="Сұрақ"
        variant="outlined"
        helperText={error}
        onChange={handleChange(`${name}.title`)}
        onBlur={(e) => {
          dispatch(questionTitleChanged({ id, title }));
          handleBlur(`${name}.title`)(e);
        }}
      />
      <FieldArray name={`${name}.answers`}>
        {(arrayHelpers) => (
          <>
            {answers.map((_, answerIdx) => (
              <AnswerDraft
                key={answerIdx}
                index={answerIdx}
                questionId={id}
                questionIndex={index}
                onRemove={() => arrayHelpers.remove(index)}
              />
            ))}
          </>
        )}
      </FieldArray>
      <Button
        variant="text"
        className="self-start"
        startIcon={<AddCircleOutlineIcon color="primary" />}
        onClick={handleAddAnswer}
      >
        Жауап қосу
      </Button>
    </div>
  );
};
