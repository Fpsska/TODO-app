import React, { useState, useEffect } from 'react';

import { useAppDispatch } from '../../../store/hooks';

import {
    setCurrentCategoryID,
    switchTodosItemEditableStatus,
    setFilterProp,
    setTitle
} from '../../../store/slices/todoSlice';
import {
    setCurrentNavSelectID,
    setSelectNavOption,
    switchNavActiveStatus
} from '../../../store/slices/navSlice';

import { Iselect } from '../../types/selectTypes';
import { Inav } from '../../types/navTypes';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

interface propTypes {
    selectTemplatesData: Iselect[];
    navTemplatesData: Inav[];
    selectNavOption: string;
    currentTodoID: number;
    isDataTLoading: boolean;
    error: any;
}

// /. interfaces

const SelectMenu: React.FC<propTypes> = (props) => {

    const {
        selectTemplatesData,
        navTemplatesData,
        selectNavOption,
        currentTodoID,
        isDataTLoading,
        error
    } = props;

    const dispatch = useAppDispatch();

    const selectMenuHandler = (value: string): void => {
        switch (value) {
            case 'All':
                dispatch(setFilterProp({ filterProp: '#all' })); // update prop for filter.ts func for real-time filtering
                dispatch(setSelectNavOption({ option: 'All' })); // switch nav-select value 

                dispatch(switchNavActiveStatus({ id: [...navTemplatesData].filter(item => item.category === 'all')[0].id, status: true })); // two-way communication/sync with NavTemplate.tsx for correct filtering

                dispatch(setTitle({ title: 'All' })); // update title globally
                dispatch(setCurrentNavSelectID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id })); // for edit current item of selectTemplatesData[]
                dispatch(setCurrentCategoryID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id })); // for edit category value of current item of todosData[] 
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false })); // disable editable todo when filtering todosData[]
                break;
            case value:
                dispatch(setFilterProp({ filterProp: `#${value.toLocaleLowerCase()}` }));
                dispatch(setSelectNavOption({ option: value }));

                dispatch(switchNavActiveStatus({ id: [...navTemplatesData].filter(item => item.category === value.toLocaleLowerCase())[0].id, status: true }));

                dispatch(setTitle({ title: value.charAt(0).toUpperCase() + value.slice(1) }));
                dispatch(setCurrentNavSelectID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
                dispatch(setCurrentCategoryID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));
                break;
            default:
                dispatch(setFilterProp({ filterProp: '#all' }));
                dispatch(setSelectNavOption({ option: 'All' }));
                dispatch(switchNavActiveStatus({ id: [...navTemplatesData].filter(item => item.category === 'all')[0].id, status: true }));

                dispatch(setTitle({ title: 'All' }));
                dispatch(setCurrentNavSelectID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
                dispatch(setCurrentCategoryID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));
        };
    };

    return (
        <select className="nav-select"
            value={selectNavOption}
            disabled={isDataTLoading || error}
            onChange={e => !isDataTLoading && !error && selectMenuHandler(e.target.value)}
        >
            {selectTemplatesData.map((item: Iselect) => {
                return (
                    <SelectTemplate
                        key={item.id}
                        text={item.text}
                        value={item.value}
                    />
                );
            })}
        </select>
    );
};

export default SelectMenu;