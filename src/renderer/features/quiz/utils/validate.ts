import { toast } from 'react-toastify';
import { QuestionFormValues, QuizFormValues } from '../types';
import { FormikErrors } from 'formik';

export const validate = (values: QuizFormValues) => {
  console.log(values);
  let errors: FormikErrors<QuizFormValues> = {};
  if (!values.title.trim().length) {
    errors.title = 'Викторина атауын енгізіңіз!';
    toast.error(errors.title);
  }
  if (isNaN(Number(values.duration))) {
    errors.duration = 'Дұрыс емес формат!';
    toast.error(errors.duration);
  }
  if (isNaN(Number(values.score))) {
    errors.score = 'Дұрыс емес формат!';
    toast.error(errors.score);
  }
  if (!values.questions.length) {
    errors.questions = 'Сұрақтар жоқ!';
    toast.error(errors.questions);
  } else {
    const questionsErrorsArray: FormikErrors<QuestionFormValues>[] = [];
    const toastErrors: any = {};
    values.questions.forEach((question, questionIdx) => {
      const questionErrors: FormikErrors<QuestionFormValues> = {};
      if (!question.title.trim()) {
        toastErrors.title = "Сұрақ атауын енгізіңіз!";
        questionErrors.title = "Сұрақ атауын енгізіңіз!";
        questionsErrorsArray[questionIdx] = questionErrors;
      }
      if (!question.correctAnswerId) {
        toastErrors.correctAnswer = "Дұрыс жауабын белгілеңіз!";
        questionErrors.correctAnswerId = "Дұрыс жауабын белгілеңіз!";
        questionsErrorsArray[questionIdx] = questionErrors;
      }
      if (question.answers.length < 2) {
        questionErrors.answers = ["Бір сұрақ кем дегенде 2 жауаптан тұру керек!"];
        toastErrors.correctAnswer = "Бір сұрақ кем дегенде 2 жауаптан тұру керек!";
        questionsErrorsArray[questionIdx] = questionErrors;
      } else {
        const answersErrorsArray: string[] = [];
        question.answers.forEach((answer, answerIdx) => {
          if (!answer.trim()) {
            answersErrorsArray[answerIdx] = "Жауап атауын енгізіңіз!";
          }
        });
        if (answersErrorsArray.length) {
          toastErrors.answers = "Жауап атауын енгізіңіз!";
          questionErrors.answers = answersErrorsArray;
          questionsErrorsArray[questionIdx] = questionErrors;
        }
      }
    })
    if (questionsErrorsArray.length) {
      errors.questions = questionsErrorsArray;
    }
    if (toastErrors.title) toast.error(toastErrors.title);
    if (toastErrors.correctAnswer) toast.error(toastErrors.correctAnswer);
    if (toastErrors.answers) toast.error(toastErrors.answers);
  }
  return errors;
};

export const validateQuestion = (values: QuestionFormValues) => {};
