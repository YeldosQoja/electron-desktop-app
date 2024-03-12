import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  answerRemoved,
  answerTitleChanged,
  correctAnswerReset,
  correctAnswerSelected,
  selectAnswersById,
  selectIsCorrect,
} from '../slices';
import { IconButton, Switch, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { getIn, useFormikContext } from 'formik';
import { QuizFormValues } from '../types';

interface Props {
  index: number;
  questionId: string;
  questionIndex: number;
  onRemove?: () => void;
}

export const AnswerDraft = ({
  questionIndex,
  questionId,
  index,
  onRemove,
}: Props) => {
  const name = `questions[${questionIndex}].answers[${index}]`;
  const dispatch = useAppDispatch();
  const answers = useAppSelector(selectAnswersById(questionId));
  const { id } = answers[index];
  const isCorrect = useAppSelector(selectIsCorrect(id));

  const {
    values: { questions },
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext<QuizFormValues>();
  const { answers: answerTitles } = questions[questionIndex];
  const title = answerTitles[index];
  const error = getIn(errors, name);

  const handleRemove = () => {
    if (typeof onRemove === 'function') {
      onRemove();
    }
    dispatch(answerRemoved(id));
  };

  const handleSwitch = (event: any, checked: boolean) => {
    if (checked) {
      setFieldValue(`questions.${questionIndex}.correctAnswerId`, id);
      dispatch(correctAnswerSelected({ id: questionId, correctAnswerId: id }));
    } else {
      setFieldValue(`questions.${questionIndex}.correctAnswerId`, '');
      dispatch(correctAnswerReset(questionId));
    }
  };

  return (
    <div className="flex justify-between items-center space-x-8">
      <h3 className="text-lg font-medium">{`Жауап ${index + 1}`}</h3>
      <TextField
        error={Boolean(error)}
        className="flex-1"
        label="Жауап"
        color="secondary"
        value={title}
        onChange={handleChange(name)}
        helperText={error}
        onBlur={() => {
          dispatch(answerTitleChanged({ id, title }));
          handleBlur(name);
        }}
      />
      <div>
        <Switch color="secondary" checked={isCorrect} onChange={handleSwitch} />
        <IconButton onClick={handleRemove}>
          <DeleteIcon color="error" />
        </IconButton>
      </div>
    </div>
  );
};
