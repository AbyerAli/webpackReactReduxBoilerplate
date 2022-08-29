import { configureStore } from '@reduxjs/toolkit';
import sampleReducer from './Slices/sampleSlice';

const store = configureStore({
  reducer: {
    sample: sampleReducer,
  },
});

export default store;
