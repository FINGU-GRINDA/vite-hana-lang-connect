import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TranslationState {
  targetLanguage: string;
  translationCache: { [key: string]: string };
  isLoading: boolean;
}

const initialState: TranslationState = {
  targetLanguage: 'ko', // 기본값을 한국어로 설정 (번역하지 않음)
  translationCache: {},
  isLoading: false,
};

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
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
  setTargetLanguage, 
  addToCache, 
  clearCache, 
  setLoading 
} = translationSlice.actions;

export default translationSlice.reducer; 