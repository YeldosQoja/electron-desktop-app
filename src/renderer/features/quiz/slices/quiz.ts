import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuestionDTO, Quiz, Result } from '../types';
import { RootState } from '@/store/store';

const initialState: Quiz = {
  title: '',
  questionCount: 0,
  scorePerQuestion: 1,
  isStarted: false,
  result: {
    correctQuestionCount: 0,
    questions: {},
    score: 0,
    totalScore: 0,
  },
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    quizStarted: (state) => {
      state.isStarted = true;
    },
    quizSaved: (state, action: PayloadAction<Omit<Quiz, 'isStarted'>>) => ({
      ...state,
      ...action.payload,
      result: {
        ...state.result,
        ...action.payload.result,
        correctQuestionCount: 0,
        questions: {},
        score: 0,
        totalScore: action.payload.scorePerQuestion * state.questionCount,
      },
    }),
    questionAnswered: (
      state,
      action: PayloadAction<{
        question: QuestionDTO;
        selectedAnswerId: string;
      }>,
    ) => {
      const { question, selectedAnswerId } = action.payload;
      const { scorePerQuestion } = state;
      const isCorrect = question.correctAnswerId === selectedAnswerId;
      state.result!.questions[question.id] = isCorrect;
      state.result!.correctQuestionCount += isCorrect ? 1 : 0;
      state.result!.score += isCorrect ? scorePerQuestion : 0;
    },
    quizFinished: () => initialState,
  },
});

export const selectResult = (state: RootState) => state.quiz.result;

export const selectQuestionResult = (id: string) => (state: RootState) => {
  const { questions } = state.quiz.result as Result;
  if (!questions.hasOwnProperty(id)) {
    return { isCorrect: false, isWrong: false };
  }
  return { isCorrect: questions[id], isWrong: !questions[id] };
}

export const { quizSaved, quizStarted, questionAnswered } = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
