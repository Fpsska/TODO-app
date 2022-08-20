import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchTodosData } from '../../app/api/fetchTodosData';

import { Itodo } from '../../app/types/todoTypes';

import { getRandomArrElement } from '../../app/helpers/getRandomArrElement';

// /. imports

interface todoSliceState {
    todosData: Itodo[];
    filteredTodosData: Itodo[];
    isTodosDataLoading: boolean;
    status: string;
    error: any;

    title: string
}

// /. interfaces

const initialState: todoSliceState = {
    todosData: [],
    filteredTodosData: [],
    isTodosDataLoading: true,
    status: '',
    error: null,

    title: 'All'
};

// /. initialState


const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {
        switchTodosDataLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isTodosDataLoading = action.payload;
        },
        setTodosData(state, action: PayloadAction<Itodo[]>) {
            state.todosData = action.payload;
        },
        setFilteredTodosData(state, action: PayloadAction<Itodo[]>) {
            state.filteredTodosData = action.payload;
        },

        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        }
    },
    extraReducers: {
        [fetchTodosData.pending.type]: (state) => {
            state.status = 'loading';
        },
        [fetchTodosData.fulfilled.type]: (state, action: PayloadAction<Itodo[]>) => {
            state.todosData = action.payload;

            state.todosData.map(item => { // extend array by category, status fields
                item.category = getRandomArrElement(['#Groceries', '#College', '#Payments', '']);
                item.status = getRandomArrElement(['waiting', 'process', 'done', '']);
                item.completed = false;
                item.editable = false;
            })

            state.filteredTodosData = action.payload;

            state.status = 'success';
        },
        [fetchTodosData.rejected.type]: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    switchTodosDataLoadingStatus,
    setTodosData,
    setFilteredTodosData,

    setTitle
} = todoSlice.actions;

export default todoSlice.reducer;