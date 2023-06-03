import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Inav } from 'types/navTypes';

// /. imports

interface navSliceState {
    navTemplatesData: Inav[];
    selectNavOption: string;
}

// /. interfaces

const navTemplates = [
    {
        id: 1,
        text: 'All',
        category: '    aLL',
        link: '#',
        isActive: true
    },
    {
        id: 2,
        text: '    Groceries  ',
        category: '   groceries  ',
        link: '#',
        isActive: false
    },
    {
        id: 3,
        text: 'College',
        category: 'COLLEGE',
        link: '#',
        isActive: false
    },
    {
        id: 4,
        text: 'Payments',
        category: 'PaYmEnTs',
        link: '#',
        isActive: false
    }
];

const navStorageData = JSON.parse(
    localStorage.getItem('navDataFromStorage') || JSON.stringify(navTemplates)
);

const initialState: navSliceState = {
    navTemplatesData: navStorageData,
    selectNavOption: 'All'
};

// /. initialState

const navSlice = createSlice({
    name: 'navSlice',
    initialState,
    reducers: {
        switchNavActiveStatus(
            state,
            action: PayloadAction<{ id: number; status: boolean }>
        ) {
            const { id, status } = action.payload;
            state.navTemplatesData.map(item =>
                item.id === id
                    ? (item.isActive = status)
                    : (item.isActive = false)
            );
        },
        addNavTemplateItem(state, action: PayloadAction<any>) {
            state.navTemplatesData.push(action.payload);
        },
        editCurrentNavTemplateItem(
            state,
            action: PayloadAction<{
                id: number;
                text: string;
                category: string;
            }>
        ) {
            const { id, text, category } = action.payload;

            const currentNavItem = state.navTemplatesData.find(
                item => item.id === id
            );
            if (currentNavItem) {
                currentNavItem.text = text;
                currentNavItem.category = category;
            }
        },
        setSelectNavOption(state, action: PayloadAction<{ option: string }>) {
            const { option } = action.payload;
            console.log('option:', option);
            state.selectNavOption = option;
        }
    }
});

export const {
    editCurrentNavTemplateItem,
    switchNavActiveStatus,
    addNavTemplateItem,
    setSelectNavOption
} = navSlice.actions;

export default navSlice.reducer;
