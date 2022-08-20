import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Inav } from '../../app/types/navTypes';
import { Iselect } from '../../app/types/selectTypes';


// /. imports

interface navSliceState {
    navTemplatesData: Inav[];
    selectTemplatesData: Iselect[];
    currentNavID: number;
    currentNavSelectID: number;
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
    currentNavSelectID: 1
};

// /. initialState


const navSlice = createSlice({
    name: 'navSlice',
    initialState,
    reducers: {
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
    }
});

export const {
    setCurrentNavID,
    editCurrentNavTemplateItem,
    switchNavActiveStatus,
    addNavTemplateItem,
    setCurrentNavSelectID,
    addNewSelectItem,
    editCurrentNavSelectTemplateItem
} = navSlice.actions;

export default navSlice.reducer;