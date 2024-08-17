import { configureStore } from '@reduxjs/toolkit';
import stateReducer from '@/store/currentState.js';

export const store = configureStore({
  reducer: {
    stateFn: stateReducer,
  },
});
