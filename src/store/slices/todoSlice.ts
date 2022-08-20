import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports


interface todoSliceState {}

// /. interfaces

const initialState: todoSliceState = {};

// /. initialState

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {}
});

export const {} = todoSlice.actions;

export default todoSlice.reducer;