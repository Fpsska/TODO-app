import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getRandomArrElement } from 'utils/helpers/getRandomArrElement';
import { makeStringFormatting } from 'utils/helpers/makeStringFormatting';

import { Itodo } from 'types/todoTypes';
import { Icategory } from 'types/categoryTypes';
import { Istatus } from 'types/statusTypes';

import { fetchTodosData } from 'app/api/fetchTodosData';

// /. imports

interface todoSliceTypes {
    todosData: Itodo[];
    filteredTodosData: Itodo[];
    categoryTemplatesData: Icategory[];
    statusTemplatesData: Istatus[];
    isTodosDataLoading: boolean;
    isFormVisible: boolean;
    isTodosDataEmpty: boolean;
    status: string;
    error: any;
    taskTitleValue: string;
    currentCategoryID: number;
    currentTodosCount: number;
    currentTodoID: string;
    filterCompareValue: string;
}

// /. interfaces

const categoryTemplates = [
    {
        id: 1,
        name: 'category',
        value: 'groceries'
    },
    {
        id: 2,
        name: 'category',
        value: 'COLLEGE'
    },
    {
        id: 3,
        name: 'category',
        value: 'payments'
    },
    {
        id: 4,
        name: 'category',
        value: 'none'
    }
];
const todosStorageData = JSON.parse(
    localStorage.getItem('todosDataFromStorage') || '[]'
);
const categoryStorageData = JSON.parse(
    localStorage.getItem('categoryDataFromStorage') ||
    JSON.stringify(categoryTemplates)
);

const initialState: todoSliceTypes = {
    todosData: todosStorageData,
    filteredTodosData: todosStorageData,
    categoryTemplatesData: categoryStorageData,
    statusTemplatesData: [
        {
            id: 1,
            name: 'status',
            value: 'waiting'
        },
        {
            id: 2,
            name: 'status',
            value: 'process'
        },
        {
            id: 3,
            name: 'status',
            value: 'done'
        },
        {
            id: 4,
            name: 'status',
            value: 'none'
        }
    ],
    isTodosDataLoading: true,
    isFormVisible: false,
    isTodosDataEmpty: true,
    status: '',
    error: null,
    taskTitleValue: 'All',
    currentCategoryID: 1,
    currentTodoID: '',
    currentTodosCount: 0,
    filterCompareValue: 'all'
};

// /. initialState

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {
        addNewTodosItem(state, action: PayloadAction<Itodo>) {
            state.todosData.push(action.payload);
        },
        removeTodosItem(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.todosData = state.todosData.filter(item => item.id !== id);
        },
        updateFilteredTodos(state, action: PayloadAction<Itodo[]>) {
            state.filteredTodosData = action.payload;
        },

        updateCategoryOfTodoItems(
            state,
            action: PayloadAction<{
                categoryProp: string;
                newCategoryValue: string;
            }>
        ) {
            const { categoryProp, newCategoryValue } = action.payload;
            const validTodosArray = state.todosData.filter(
                item => makeStringFormatting(item.category) === categoryProp
            );
            if (validTodosArray) {
                validTodosArray.map(item => (item.category = newCategoryValue));
            }
        },
        switchTodosItemEditableStatus(
            state,
            action: PayloadAction<{ id: string; status: boolean }>
        ) {
            const { id, status } = action.payload;
            state.todosData.map(item =>
                item.id === id
                    ? (item.editable = status)
                    : (item.editable = false)
            );
        },
        switchTodosItemCompleteStatus(
            state,
            action: PayloadAction<{ id: string; status: boolean }>
        ) {
            const { id, status } = action.payload;

            const currentTodoItem = state.todosData.find(
                item => item.id === id
            );
            if (currentTodoItem) {
                currentTodoItem.completed = !status;
            }
        },

        findTodosItemByName(state, action: PayloadAction<{ value: string }>) {
            const { value } = action.payload;
            state.filteredTodosData = state.todosData.filter(item =>
                RegExp(value.trim(), 'gi').test(item.title)
            );
        },
        setFilterCompareValue(
            state,
            action: PayloadAction<{ filterCompareValue: string }>
        ) {
            const { filterCompareValue } = action.payload;
            state.filterCompareValue = filterCompareValue;
        },
        editCurrentTodosDataItem(
            state,
            action: PayloadAction<{
                id: string;
                title: string;
                category: string;
                status: string;
            }>
        ) {
            const { id, title, category, status } = action.payload;

            const currentTodoItem = state.todosData.find(
                item => item.id === id
            );
            if (currentTodoItem) {
                currentTodoItem.title = title;
                currentTodoItem.category = category;
                currentTodoItem.status = status;
                currentTodoItem.editable = false;
            }
        },

        setTaskTitleValue(state, action: PayloadAction<{ title: string }>) {
            const { title } = action.payload;
            // console.log(title);
            state.taskTitleValue = title;
        },

        setCurrentCategoryID(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.currentCategoryID = id;
        },
        addNewCategoryItem(state, action: PayloadAction<any>) {
            state.categoryTemplatesData.push(action.payload);
        },
        editCurrentCategoryTemplateItem(
            state,
            action: PayloadAction<{ id: number; value: string }>
        ) {
            const { id, value } = action.payload;

            const currentCategoryItem = state.categoryTemplatesData.find(
                item => item.id === id
            );
            if (currentCategoryItem) {
                currentCategoryItem.value = value;
            }
        },

        setCurrentTodoID(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.currentTodoID = id;
        },
        setCurrentTodosCount(state, action: PayloadAction<{ count: number }>) {
            const { count } = action.payload;
            state.currentTodosCount = count;
        },
        switchFormVisibleStatus(
            state,
            action: PayloadAction<{ status: boolean }>
        ) {
            const { status } = action.payload;
            state.isFormVisible = status;
        },
        switchTodosDataEmptyStatus(
            state,
            action: PayloadAction<{ status: boolean }>
        ) {
            const { status } = action.payload;
            state.isTodosDataEmpty = status;
        },

        switchTodosDataLoadingStatus(
            state,
            action: PayloadAction<{ status: boolean }>
        ) {
            const { status } = action.payload;
            state.isTodosDataLoading = status;
        },
        switchErrorStatus(
            state,
            action: PayloadAction<{ status: boolean | null }>
        ) {
            const { status } = action.payload;
            state.error = status;
        }
    },
    extraReducers: {
        [fetchTodosData.pending.type]: state => {
            state.status = 'loading';
        },
        [fetchTodosData.fulfilled.type]: (
            state,
            action: PayloadAction<Itodo[]>
        ) => {
            // const fetchedData =
            //     action.payload.map((item: Itodo) => {
            //         if (item) {
            //             return {
            //                 ...item,
            //                 category: getRandomArrElement(['groceries', 'college', 'payments', '']),
            //                 status: getRandomArrElement(['waiting', 'process', 'done', '']),
            //                 completed: false,
            //                 editable: false
            //             };
            //         }
            //     });

            // localStorage.setItem('todosDataFromStorage', JSON.stringify(fetchedData));

            state.status = 'success';
            state.error = null;
        },
        [fetchTodosData.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    switchTodosDataLoadingStatus,
    addNewTodosItem,
    removeTodosItem,
    updateFilteredTodos,
    findTodosItemByName,
    setFilterCompareValue,
    editCurrentTodosDataItem,
    updateCategoryOfTodoItems,
    switchTodosItemEditableStatus,
    switchTodosItemCompleteStatus,
    setTaskTitleValue,
    setCurrentCategoryID,
    addNewCategoryItem,
    editCurrentCategoryTemplateItem,
    setCurrentTodoID,
    setCurrentTodosCount,
    switchFormVisibleStatus,
    switchTodosDataEmptyStatus,
    switchErrorStatus
} = todoSlice.actions;

export default todoSlice.reducer;
