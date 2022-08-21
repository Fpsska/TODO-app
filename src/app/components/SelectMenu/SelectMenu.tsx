import React, { useState, useEffect } from 'react';

import { useAppDispatch } from '../../../store/hooks';

import {
    setCurrentCategoryID,
    switchTodosItemEditableStatus,
    setFilterProp,
    setTitle
} from '../../../store/slices/todoSlice';
import { setCurrentNavSelectID, setSelectNavOption } from '../../../store/slices/navSlice';

import { Iselect } from '../../types/selectTypes';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

interface propTypes {
    selectTemplatesData: Iselect[];
    selectNavOption: string;
    currentTodoID: number;
    isDataTLoading: boolean;
    title: string;
    error: any;
}

// /. interfaces

const SelectMenu: React.FC<propTypes> = (props) => {

    const {
        selectTemplatesData,
        selectNavOption,
        currentTodoID,
        isDataTLoading,
        title,
        error
    } = props;

    const dispatch = useAppDispatch();

    const selectMenuHandler = (value: string): void => {
        switch (value) {
            case 'all':
                dispatch(setFilterProp({ filterProp: '#all' })); // update prop for filter.ts func for real-time filtering
                dispatch(setSelectNavOption({ option: 'All' })); // switch nav-select value 
                dispatch(setTitle({ title: 'All' })); // update title globally
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false })); // disable editable todo when filtering todosData[]

                dispatch(setCurrentNavSelectID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id })); // for edit current item of selectTemplatesData[]
                dispatch(setCurrentCategoryID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id })); // for edit category value of current item of todosData[] 
                break;
            case value:
                dispatch(setFilterProp({ filterProp: `#${value.toLocaleLowerCase()}` }));
                dispatch(setSelectNavOption({ option: value })); 
                dispatch(setTitle({ title: value.charAt(0).toUpperCase() + value.slice(1) }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));

                dispatch(setCurrentNavSelectID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
                dispatch(setCurrentCategoryID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
                break;
            default:
                dispatch(setFilterProp({ filterProp: '#all' }));
                dispatch(setSelectNavOption({ option: 'All' }));
                dispatch(setTitle({ title: 'All' }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));

                dispatch(setCurrentNavSelectID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
                dispatch(setCurrentCategoryID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
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