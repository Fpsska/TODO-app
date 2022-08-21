import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Inav } from '../../app/types/navTypes';
import { Iselect } from '../../app/types/selectTypes';


// /. imports

interface navSliceState {
    navTemplatesData: Inav[];
    selectTemplatesData: Iselect[];
    currentNavID: number;
    currentNavSelectID: number;
    selectNavOption: string
}

// /. interfaces

const initialState: navSliceState = {
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
            id: 3,
            text: 'College',
            category: 'college',
            link: '#',
            isActive: false
        },
        {
            id: 4,
            text: 'Payments',
            category: 'payments',
            link: '#',
            isActive: false
        }
    ],
    selectTemplatesData: [
        {
            id: 1,
            text: 'All',
            value: 'All'
        },
        {
            id: 2,
            text: 'Groceries',
            value: 'Groceries'
        },
        {
            id: 3,
            text: 'College',
            value: 'College'
        },
        {
            id: 4,
            text: 'Payments',
            value: 'Payments'
        }
    ],
    currentNavID: 1,
    currentNavSelectID: 1,
    selectNavOption: 'All'
};

// /. initialState


const navSlice = createSlice({
    name: 'navSlice',
    initialState,
    reducers: {
        switchNavActiveStatus(state, action: PayloadAction<{ id: number, status: boolean }>) {
            const { id, status } = action.payload;
            state.navTemplatesData.map(item => item.id === id ? item.isActive = status : item.isActive = false);
        },
        setCurrentNavID(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.currentNavID = id;
        },
        addNavTemplateItem(state, action: PayloadAction<any>) {
            state.navTemplatesData.push(action.payload);
        },
        editCurrentNavTemplateItem(state, action: PayloadAction<{ id: number, text: string, category: string }>) {
            const { id, text, category } = action.payload;

            const currentNavItem = state.navTemplatesData.find(item => item.id === id);
            if (currentNavItem) {
                currentNavItem.text = text;
                currentNavItem.category = category;
            }
        },
        setCurrentNavSelectID(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            state.currentNavSelectID = id;
        },
        addNewSelectItem(state, action: PayloadAction<any>) {
            state.selectTemplatesData.push(action.payload);
        },
        editCurrentNavSelectTemplateItem(state, action: PayloadAction<{ id: number, text: string, value: string }>) {
            const { id, text, value } = action.payload;

            const currentCategoryItem = state.selectTemplatesData.find(item => item.id === id);
            if (currentCategoryItem) {
                currentCategoryItem.text = text;
                currentCategoryItem.value = value;
            }
        },
        setSelectNavOption(state, action: PayloadAction<{ option: string }>) {
            const { option } = action.payload;
            state.selectNavOption = option;
        }
    }
});

export const {
    setCurrentNavID,
    editCurrentNavTemplateItem,
    switchNavActiveStatus,
    addNavTemplateItem,
    setCurrentNavSelectID,
    addNewSelectItem,
    editCurrentNavSelectTemplateItem,
    setSelectNavOption
} = navSlice.actions;

export default navSlice.reducer;