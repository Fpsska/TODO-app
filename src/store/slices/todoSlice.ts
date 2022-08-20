import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchTodosData } from '../../app/api/fetchTodosData';

import { Itodo } from '../../app/types/todoTypes';
import { Inav } from '../../app/types/navTypes';

import { getRandomArrElement } from '../../app/helpers/getRandomArrElement';

// /. imports

interface todoSliceState {
    todosData: Itodo[];
    filteredTodosData: Itodo[];
    isTodosDataLoading: boolean;
    status: string;
    error: any;

    title: string;

    navTemplatesData: Inav[];
    currentNavID: number;

    currentCategoryID: number;
    currentNavSelectID: number;

}

// /. interfaces

const initialState: todoSliceState = {
    todosData: [],
    filteredTodosData: [],
    isTodosDataLoading: true,
    status: '',
    error: null,

    title: 'All',

    navTemplatesData: [
        {
            id: 1,
            text: 'All',
            category: 'all',
            link: '#',
            isActive: true
        },
        {
            id: 2,
            text: 'Groceries',
            category: 'groceries',
            link: '#',
            isActive: false
        },
        {
            id: 4,
            text: 'College',
            category: 'college',
            link: '#',
            isActive: false
        },
        {
            id: 5,
            text: 'Payments',
            category: 'payments',
            link: '#',
            isActive: false
        }
    ],
    currentNavID: 1,

    currentCategoryID: 1,
    currentNavSelectID: 1


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
        },

        setNavTemplatesData(state, action: PayloadAction<Inav[]>) {
            state.navTemplatesData = action.payload;
        },
        switchNavActiveStatus(state, action: PayloadAction<{id: number}>) {
            const { id } = action.payload;
            state.navTemplatesData.map(item => item.id === id ? item.isActive === true : item.isActive = false);
        },
        setCurrentNavID(state, action: PayloadAction<number>) {
            state.currentNavID = action.payload;
        },

        setCurrentCategoryID(state, action: PayloadAction<number>) {
            state.currentNavID = action.payload;
        },
        setCurrentNavSelectID(state, action: PayloadAction<number>) {
            state.currentNavSelectID = action.payload;
        },


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

    setTitle,

    setNavTemplatesData,
    setCurrentNavID,
    switchNavActiveStatus,

    setCurrentCategoryID,
    setCurrentNavSelectID

} = todoSlice.actions;

export default todoSlice.reducer;