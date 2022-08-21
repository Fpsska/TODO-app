import React, { useState, useEffect } from 'react';

import { useAppDispatch } from '../../../store/hooks';

import {
    setCurrentCategoryID,
    switchTodosItemEditableStatus,
    setFilterProp,
    setTitle
} from '../../../store/slices/todoSlice';
import { setCurrentNavSelectID } from '../../../store/slices/navSlice';

import { Iselect } from '../../types/selectTypes';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

interface propTypes {
    selectTemplatesData: Iselect[];
    currentTodoID: number;
    isDataTLoading: boolean;
    title: string
    error: any
}

// /. interfaces

const SelectMenu: React.FC<propTypes> = (props) => {

    const {
        selectTemplatesData,
        currentTodoID,
        isDataTLoading,
        title,
        error
    } = props;

    const dispatch = useAppDispatch();

    const selectMenuHandler = (value: string): void => {
        switch (value) {
            case 'all':
                dispatch(setFilterProp({ filterProp: `#${value}` }));
                dispatch(setTitle({ title: 'All' }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));

                // dispatch(setCurrentNavSelectID([...selectTemplatesData].find(item => item.value === value)?.id));

                // for edit categoryTemplatesData[] items
                // dispatch(setCurrentCategoryID([...selectTemplatesData].find(item => item.value === value)?.id));
                break;
            case value:
                dispatch(setFilterProp({ filterProp: `#${value}` }));
                dispatch(setTitle({ title: value.charAt(0).toUpperCase() + value.slice(1) }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));

                // dispatch(setCurrentNavSelectID([...selectTemplatesData].find(item => item.value === value)?.id));
                // dispatch(setCurrentCategoryID([...selectTemplatesData].find(item => item.value === value)?.id));
                break;
            default:
                dispatch(setFilterProp({ filterProp: '#all' }));
                dispatch(setTitle({ title: 'All' }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));

            // dispatch(setCurrentNavSelectID([...selectTemplatesData].find(item => item.value === value)?.id));
            // dispatch(setCurrentCategoryID([...selectTemplatesData].find(item => item.value === value)?.id));
        };
    };

    return (
        <select className="nav-select"
            onChange={e => !isDataTLoading && !error && selectMenuHandler(e.target.value)}
            defaultValue={title}
            disabled={isDataTLoading || error}
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