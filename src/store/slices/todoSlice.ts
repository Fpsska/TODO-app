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
        switchTodosDataLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isTodosDataLoading = action.payload;
        },
        setTodosData(state, action: PayloadAction<Itodo[]>) {
            state.todosData = action.payload;
        },
        setFilteredTodosData(state, action: PayloadAction<Itodo[]>) {
            state.filteredTodosData = action.payload;
        },

        filterTodosDataByCategory(state, action: PayloadAction<{ category: string }>) {
            const { category } = action.payload;
            state.todosData = state.filteredTodosData.filter(item => item.category.toLocaleLowerCase() === category);
        },
        editCurrentTodosDataItem(state, action: PayloadAction<{ inputValue: string, inputRadioCategoryValue: string, inputRadioStatusValue: string }>) {
            const {inputValue, inputRadioCategoryValue, inputRadioStatusValue} = action.payload;
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
        switchTodosItemEditableStatus(state, action: PayloadAction<{id: number}>) {
            const {id} = action.payload;
            state.todosData.map(item => item.id === id ? item.editable = true : item);

        },

        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },


        switchNavActiveStatus(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.navTemplatesData.map(item => item.id === id ? item.isActive === true : item.isActive = false);
        },
        setCurrentNavID(state, action: PayloadAction<number>) {
            state.currentNavID = action.payload;
        },
        addNavTemplateItem(state, action: PayloadAction<any>) {
            state.navTemplatesData.push(action.payload);
        },

        setCurrentCategoryID(state, action: PayloadAction<number>) {
            state.currentNavID = action.payload;
        },
        addNewCategoryItem(state, action: PayloadAction<any>) {
            state.categoryTemplatesData.push(action.payload);
        },


        setCurrentNavSelectID(state, action: PayloadAction<number>) {
            state.currentNavSelectID = action.payload;
        },
        addNewSelectItem(state, action: PayloadAction<any>) {
            state.selectTemplatesData.push(action.payload);
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
    filterTodosDataByCategory,
    editCurrentTodosDataItem,
    switchTodosItemEditableStatus,

    setTitle,

    setCurrentNavID,
    switchNavActiveStatus,
    addNavTemplateItem,

    setCurrentCategoryID,
    addNewCategoryItem,

    setCurrentNavSelectID,
    addNewSelectItem


} = todoSlice.actions;

export default todoSlice.reducer;