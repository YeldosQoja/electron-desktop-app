import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Answer } from '../types';
import { nanoid } from 'nanoid/non-secure';
import { RootState } from '@/store/store';

interface AnswersState {
  ids: string[];
  entities: { [id: string]: Answer };
}

export const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    ids: [],
    entities: {},
  } as AnswersState,
  reducers: {
    answerAdded: {
      reducer: (
        state,
        action: PayloadAction<{ id: string; questionId: string }>,
      ) => {
        const { id, questionId } = action.payload;
        state.ids.push(id);
        state.entities[id] = {
          id,
          questionId,
          title: '',
        };
      },
      prepare: (questionId: string) => ({
        payload: {
          questionId,
          id: nanoid(),
        },
      }),
    },
    answerRemoved: (state, action: PayloadAction<string>) => {
      const index = state.ids.indexOf(action.payload);
      if (index !== -1) {
        state.ids.splice(index, 1);
        delete state.entities[action.payload];
      }
    },
    questionAnswersCleared: (state, action: PayloadAction<string>) => {
      const questionId = action.payload;
      state.ids.forEach(id => {
        if (state.entities[id].questionId === questionId) {
          delete state.entities[id];
        }
      });
      const filteredIds = state.ids.filter(id => state.entities.hasOwnProperty(id));
      state.ids = filteredIds;
    },
    answerTitleChanged: (
      state,
      action: PayloadAction<Omit<Answer, 'questionId'>>,
    ) => {
      const { id, title } = action.payload;
      state.entities[id].title = title;
    },
  },
});

export const { answerAdded, answerRemoved, answerTitleChanged, questionAnswersCleared } = answersSlice.actions;

export const selectAllAnswers = (state: RootState) => {
  const { ids, entities } = state.answers;
  return ids.map(id => entities[id]);
}

export const selectAnswerById = (id: string) => (state: RootState) => {
  const { entities } = state.answers;
  return entities[id];
};

export const selectIsCorrect = (id: string) => (state: RootState) => {
  const { questions, answers } = state;
  const { questionId } = answers.entities[id];
  const question = questions.entities[questionId];
  return question.correctAnswerId === id;
}

export const answersReducer = answersSlice.reducer;
