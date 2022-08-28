import { configureStore } from '@reduxjs/toolkit';
import sampleReducer from './Slices/sampleSlice';

export const store = configureStore({
  reducer: {
    sample: sampleReducer,
  },
});
