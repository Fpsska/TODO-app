import { configureStore } from '@reduxjs/toolkit';

import todoSlice from './slices/todoSlice';
import navSlice from './slices/navSlice';

// /. imports

export const store = configureStore({
    reducer: {
        todoSlice: todoSlice,
        navSlice: navSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
