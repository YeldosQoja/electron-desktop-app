import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuestionDTO } from '../types';
import { nanoid } from 'nanoid/non-secure';
import { RootState } from '@/store/store';

interface QuestionsState {
  ids: string[];
  entities: { [id: string]: QuestionDTO };
}

export const questionsSlice = createSlice({
  name: 'question',
  initialState: {
    ids: [],
    entities: {},
  } as QuestionsState,
  reducers: {
    questionAdded: {
      reducer: (state, action: PayloadAction<string>) => {
        state.ids.push(action.payload);
        state.entities[action.payload] = {
          id: action.payload,
          title: '',
          type: 'single_answer',
          hasImage: false,
          correctAnswerId: null,
        };
      },
      prepare: () => ({ payload: nanoid() }),
    },
    questionRemoved: (state, action: PayloadAction<string>) => {
      const index = state.ids.indexOf(action.payload);
      state.ids.splice(index, 1);
      delete state.entities[action.payload];
    },
    questionTitleChanged: (
      state,
      action: PayloadAction<Pick<QuestionDTO, 'id' | 'title'>>,
    ) => {
      const { id, title } = action.payload;
      state.entities[id].title = title;
    },
    questionImageUploaded: (
      state,
      action: PayloadAction<Pick<QuestionDTO, 'id' | 'imgSrc'>>,
    ) => {
      const { id, imgSrc } = action.payload;
      state.entities[id].hasImage = true;
      state.entities[id].imgSrc = imgSrc;
    },
    questionImageRemoved: (state, action: PayloadAction<number>) => {
      state.entities[action.payload].hasImage = false;
      state.entities[action.payload].imgSrc = undefined;
    },
    correctAnswerSelected: (state, action: PayloadAction<{ id: string, correctAnswerId: string }>) => {
      const { id, correctAnswerId } = action.payload;
      state.entities[id].correctAnswerId = correctAnswerId;
    },
    correctAnswerReset: (state, action: PayloadAction<string>) => {
      state.entities[action.payload].correctAnswerId = null;
    },
  },
});

const emptyQuestions: QuestionDTO[] = [];

export const selectQuestions = (state: RootState) => {
  const { ids, entities } = state.questions;
  if (ids.length === 0) {
    return emptyQuestions;
  }
  return ids.map(id => entities[id]);
}

export const selectQuestionById = (id: string) => (state: RootState) => state.questions.entities[id];

export const selectAnswersById = (questionId: string) => (state: RootState) => {
  const { ids, entities } = state.answers;
  return ids.map(id => entities[id]).filter(a => a.questionId === questionId);
}

export const {
  questionAdded,
  questionImageUploaded,
  questionImageRemoved,
  questionRemoved,
  questionTitleChanged,
  correctAnswerSelected,
  correctAnswerReset,
} = questionsSlice.actions;
export const questionsReducer = questionsSlice.reducer;
