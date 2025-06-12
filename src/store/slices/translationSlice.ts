import { createSlice } from '@reduxjs/toolkit';

interface TranslationState {
  isTranslationEnabled: boolean;
}

const initialState: TranslationState = {
  isTranslationEnabled: false,
};

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    toggleTranslation: (state) => {
      state.isTranslationEnabled = !state.isTranslationEnabled;
    },
    setTranslation: (state, action) => {
      state.isTranslationEnabled = action.payload;
    },
  },
});

export const { toggleTranslation, setTranslation } = translationSlice.actions;
export default translationSlice.reducer; 