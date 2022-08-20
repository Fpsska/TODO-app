import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchTodosData } from '../../app/api/fetchTodosData';

import { Itodo } from '../../app/types/todoTypes';
import { Inav } from '../../app/types/navTypes';
import { Icategory } from '../../app/types/categoryTypes';
import { Iselect } from '../../app/types/selectTypes';

import { getRandomArrElement } from '../../app/helpers/getRandomArrElement';

// /. imports

interface todoSliceState {
    todosData: Itodo[];
    filteredTodosData: Itodo[];
    selectTemplatesData: Iselect[];
    isTodosDataLoading: boolean;
    status: string;
    error: any;

    title: string;

    navTemplatesData: Inav[];
    categoryTemplatesData: Icategory[];
    currentNavID: number;

    currentCategoryID: number;
    currentNavSelectID: number;
    currentTodoID: number;

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
    selectTemplatesData: [
        {
            id: 1,
            text: 'All',
            value: 'all'
        },
        {
            id: 2,
            text: 'Groceries',
            value: 'groceries'
        },
        {
            id: 3,
            text: 'College',
            value: 'college'
        },
        {
            id: 4,
            text: 'Payments',
            value: 'payments'
        }
    ],
    currentNavID: 1,

    currentCategoryID: 1,
    currentNavSelectID: 1,
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
        setFilteredTodosData(state, action: PayloadAction<Itodo[]>) {
            state.filteredTodosData = action.payload;
        },

        removeTodosDataItem(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.todosData = state.todosData.filter(item => item.id !== id);
        },
        filterTodosDataByCategory(state, action: PayloadAction<{ category: string }>) {
            const { category } = action.payload;
            state.todosData = state.filteredTodosData.filter(item => item.category.toLocaleLowerCase() === category);
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
        editCategoryOFCurrentTodosDataItem(state, action: PayloadAction<{categoryValue: string }>) { //  categoryProp: string, 
            const {  categoryValue } = action.payload; // categoryProp,
            state.todosData.map(item => {
                
            })
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


        switchNavActiveStatus(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.navTemplatesData.map(item => item.id === id ? item.isActive === true : item.isActive = false);
        },
        setCurrentNavID(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.currentNavID = id;
        },
        addNavTemplateItem(state, action: PayloadAction<any>) {
            state.navTemplatesData.push(action.payload);
        },
        editCurrentNavTemplateItem(state, action: PayloadAction<{ text: string, category: string }>) {
            const { text, category } = action.payload;
            state.navTemplatesData.map(item => {
                if (item.id === state.currentNavID) {
                    return {
                        ...item,
                        text: text,
                        category: category
                    };
                }
                return item;
            })
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


        setCurrentNavSelectID(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.currentNavSelectID = id;
        },
        addNewSelectItem(state, action: PayloadAction<any>) {
            state.selectTemplatesData.push(action.payload);
        },
        editCurrentNavSelectTemplateItem(state, action: PayloadAction<{ text: string, value: string }>) {
            const { text, value } = action.payload;
            state.selectTemplatesData.map(item => {
                if (item.id === state.currentNavSelectID) {
                    return {
                        ...item,
                        text: text, // displayed in UI
                        value: value // logic
                    };
                }
                return item;
            })
        },


        setCurrentTodoID(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.currentTodoID = id;
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

    setCurrentNavID,
    editCurrentNavTemplateItem,
    switchNavActiveStatus,
    addNavTemplateItem,

    setCurrentCategoryID,
    addNewCategoryItem,
    editCurrentCategoryTemplateItem,

    setCurrentNavSelectID,
    addNewSelectItem,
    editCurrentNavSelectTemplateItem,

    setCurrentTodoID

} = todoSlice.actions;

export default todoSlice.reducer;