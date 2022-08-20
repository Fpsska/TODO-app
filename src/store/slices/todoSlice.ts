import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { fetchTodosData } from '../../app/api/fetchTodosData';

import { Itodo } from '../../app/types/todoTypes';
import { Icategory } from '../../app/types/categoryTypes';

import { getRandomArrElement } from '../../app/helpers/getRandomArrElement';

// /. imports

interface todoSliceState {
    todosData: Itodo[];
    filteredTodosData: Itodo[];
    categoryTemplatesData: Icategory[];
    isTodosDataLoading: boolean;
    isFormVisible: boolean;
    status: string;
    error: any;
    title: string;
    inputTitleValue: string;
    currentCategoryID: number;
    currentTodoID: number;
}

// /. interfaces

const initialState: todoSliceState = {
    todosData: [],
    filteredTodosData: [],
    categoryTemplatesData: [
        {
            id: 1,
            name: 'category',
            text: 'groceries',
            value: 'groceries'
        },
        {
            id: 2,
            name: 'category',
            text: 'college',
            value: 'college'
        },
        {
            id: 3,
            name: 'category',
            text: 'payments',
            value: 'payments'
        },
        {
            id: 4,
            name: 'category',
            text: 'none',
            value: ''
        }
    ],
    isTodosDataLoading: true,
    isFormVisible: false,
    status: '',
    error: null,
    title: 'All',
    inputTitleValue: '',
    currentCategoryID: 1,
    currentTodoID: 1
};

// /. initialState


const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {
        switchTodosDataLoadingStatus(state, action: PayloadAction<{ status: boolean }>) {
            const { status } = action.payload;
            state.isTodosDataLoading = status;
        },
        setTodosData(state, action: PayloadAction<Itodo[]>) {
            state.todosData = action.payload;
        },
        setFilteredTodosData(state, action: PayloadAction<Itodo[]>) { // FORM.TSX
            state.filteredTodosData = action.payload;
        },
        removeTodosDataItem(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.todosData = state.todosData.filter(item => item.id !== id);
        },
        filterTodosDataByCategory(state, action: PayloadAction<{ category: string }>) {
            const { category } = action.payload;
            // state.todosData = state.filteredTodosData.filter(item => item.category.toLocaleLowerCase() === category);
            state.todosData = state.filteredTodosData.filter(item => {
                if (item.category.toLocaleLowerCase() === category) {
                    return item;
                } else if (!category)
                    return state.todosData;
            });
        },
        editCurrentTodosDataItem(state, action: PayloadAction<{ inputValue: string, inputRadioCategoryValue: string, inputRadioStatusValue: string }>) {
            const { inputValue, inputRadioCategoryValue, inputRadioStatusValue } = action.payload;
            state.todosData.map(item => {
                if (item.id === state.currentTodoID) {
                    return {
                        ...item,
                        title: inputValue,
                        category: inputRadioCategoryValue ? `#${(inputRadioCategoryValue.charAt(0).toUpperCase() + inputRadioCategoryValue.slice(1)).replace(/#/gi, '')}` : '', // set upperCase for 1st letter of getted inputRadioValue
                        status: inputRadioStatusValue,
                        editable: false
                    };
                }
            })
        },
        editCategoryOFCurrentTodosDataItem(state, action: PayloadAction<{ categoryValue: string }>) { //  categoryProp: string, 
            // const {  categoryValue } = action.payload; // categoryProp,
            // state.todosData.map(item => {

            // })
        },
        switchTodosItemEditableStatus(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.todosData.map(item => item.id === id ? item.editable = true : item);
        },
        switchTodosItemCompleteStatus(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.todosData.map(item => item.id === id ? item.completed = !item.completed : item);
        },
        setTitle(state, action: PayloadAction<{ title: string }>) {
            const { title } = action.payload;
            state.title = title;
        },
        setInputTitleValue(state, action: PayloadAction<{ title: string }>) {
            const { title } = action.payload;
            state.inputTitleValue = title;
        },
        setCurrentCategoryID(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.currentCategoryID = id;
        },
        addNewCategoryItem(state, action: PayloadAction<any>) {
            state.categoryTemplatesData.push(action.payload);
        },
        editCurrentCategoryTemplateItem(state, action: PayloadAction<{ text: string, value: string }>) {
            const { text, value } = action.payload;
            state.categoryTemplatesData.map(item => {
                if (item.id === state.currentCategoryID) {
                    return {
                        ...item,
                        text: text, // displayed in UI
                        value: value // logic
                    }
                }
                return item;
            })
        },
        setCurrentTodoID(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.currentTodoID = id;
        },
        switchFormVisibleStatus(state, action: PayloadAction<{ status: boolean }>) {
            const { status } = action.payload;
            state.isFormVisible = status;
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
    removeTodosDataItem,
    filterTodosDataByCategory,
    editCurrentTodosDataItem,
    editCategoryOFCurrentTodosDataItem,
    switchTodosItemEditableStatus,
    switchTodosItemCompleteStatus,
    setTitle,
    setInputTitleValue,
    setCurrentCategoryID,
    addNewCategoryItem,
    editCurrentCategoryTemplateItem,
    setCurrentTodoID,
    switchFormVisibleStatus
} = todoSlice.actions;

export default todoSlice.reducer;