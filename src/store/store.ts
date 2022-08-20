import { configureStore } from '@reduxjs/toolkit';

import todoSlice from './slices/todoSlice';

// /. imports

export const store = configureStore({
  reducer: {
    todoSlice: todoSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;