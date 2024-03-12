import React, { Fragment, useState } from 'react';
import { Button, TextField } from '@mui/material';
import {
  Send as SendIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  QuestionDraft,
  QuizFormValues,
  QuizStartModal,
  questionAdded,
  quizSaved,
  quizStarted,
  selectQuestions,
  validate,
} from '@/features/quiz';
import { FieldArray, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(selectQuestions);
  console.log(questions);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    dispatch(questionAdded());
  };

  const handleSave = (values: QuizFormValues) => {
    console.log('handleSave')
    const { score, duration } = values;
    dispatch(
      // @ts-ignore
      quizSaved({
        ...values,
        questionCount: questions.length,
        scorePerQuestion: score === '' ? 1 : Number(score),
        duration: duration === '' ? undefined : Number(score),
      }),
    );
    setModalVisible(true);
  };

  const handleAccept = () => {
    dispatch(quizStarted());
    navigate('/quiz');
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex min-h-dvh overflow-scroll-y bg-background justify-center">
      <Formik
        validate={validate}
        onSubmit={handleSave}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={
          {
            title: '',
            topic: '',
            duration: '',
            score: '',
            questions: [],
          } as QuizFormValues
        }
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <div className="flex flex-col w-1/2 bg-white p-16 items-stretch space-y-4">
            <h1 className="text-3xl font-medium">Викторина құру</h1>
            <TextField
              error={Boolean(errors.title)}
              value={values.title}
              label="Атауы"
              variant="outlined"
              helperText={errors.title}
              onChange={handleChange('title')}
              onBlur={handleBlur('title')}
            />
            <TextField
              error={Boolean(errors.topic)}
              value={values.topic}
              label="Тақырыбы"
              variant="outlined"
              helperText={errors.topic}
              onChange={handleChange('topic')}
              onBlur={handleBlur('topic')}
            />
            <div className="space-x-7">
              <TextField
                error={Boolean(errors.score)}
                value={values.score}
                label="Балл"
                variant="filled"
                helperText={errors.score}
                onChange={handleChange('score')}
                onBlur={handleBlur('score')}
              />
              <TextField
                error={Boolean(errors.duration)}
                value={values.duration}
                label="Ұзақтығы"
                variant="filled"
                helperText={errors.duration}
                onChange={handleChange('duration')}
                onBlur={handleBlur('duration')}
              />
            </div>
            <FieldArray name="questions">
              {(arrayHelpers) => (
                <Fragment>
                  <div>
                    {values.questions.map((question, index) => (
                      <QuestionDraft
                        key={index}
                        index={index}
                        onRemove={() => arrayHelpers.remove(index)}
                      />
                    ))}
                  </div>
                  <div className="flex justify-evenly">
                    <Button
                      variant="outlined"
                      className="w-2/5 border-2 p-4 text-lg normal-case rounded-[50px]"
                      endIcon={
                        <AddCircleOutlineIcon
                          sx={{ width: '25px', height: '25px' }}
                        />
                      }
                      onClick={() => {
                        arrayHelpers.push({
                          title: '',
                          correctAnswerId: '',
                          answers: [],
                        });
                        handleAddQuestion();
                      }}
                    >
                      Сұрақ қосу
                    </Button>
                    <Button
                      variant="contained"
                      className="bg-primary w-2/5 p-4 text-lg normal-case rounded-[50px]"
                      onClick={() => {
                        handleSubmit();
                      }}
                      endIcon={
                        <SendIcon
                          sx={{
                            width: '25px',
                            height: '25px',
                            marginLeft: '6px',
                          }}
                        />
                      }
                    >
                      Сақтау
                    </Button>
                  </div>
                </Fragment>
              )}
            </FieldArray>
          </div>
        )}
      </Formik>
      <QuizStartModal
        visible={modalVisible}
        onAccept={handleAccept}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CreateQuiz;
