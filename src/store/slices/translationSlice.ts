import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TranslationState {
  isTranslationEnabled: boolean;
  targetLanguage: string;
  translationCache: { [key: string]: string };
  isLoading: boolean;
}

const initialState: TranslationState = {
  isTranslationEnabled: false,
  targetLanguage: 'en',
  translationCache: {},
  isLoading: false,
};

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    toggleTranslation: (state) => {
      state.isTranslationEnabled = !state.isTranslationEnabled;
    },
    setTranslation: (state, action: PayloadAction<boolean>) => {
      state.isTranslationEnabled = action.payload;
    },
    setTargetLanguage: (state, action: PayloadAction<string>) => {
      state.targetLanguage = action.payload;
    },
    addToCache: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.translationCache[action.payload.key] = action.payload.value;
    },
    clearCache: (state) => {
      state.translationCache = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { 
  toggleTranslation, 
  setTranslation, 
  setTargetLanguage, 
  addToCache, 
  clearCache, 
  setLoading 
} = translationSlice.actions;

export default translationSlice.reducer; 