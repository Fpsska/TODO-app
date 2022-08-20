import React from 'react';

import { useAppDispatch } from '../../../store/hooks';

import {
    setCurrentNavSelectID,
    setCurrentCategoryID,
    switchTodosItemEditableStatus,
    filterTodosDataByCategory,
    setTitle,
} from '../../../store/slices/todoSlice';

import { Iselect } from '../../types/selectTypes';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

interface propTypes {
    selectTemplatesData: Iselect[];
    currentTodoID: number;
    isDataTLoading: boolean;
    error: any
}

// /. interfaces

const SelectMenu: React.FC<propTypes> = (props) => {

    const {
        selectTemplatesData,
        currentTodoID,
        isDataTLoading,
        error
    } = props;

    const dispatch = useAppDispatch();

    const selectMenuHandler = (value: string): void => {
        switch (value) {
            case 'all':
                dispatch(filterTodosDataByCategory({ category: 'all' }));

                dispatch(setTitle({ title: 'All' }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID }));

                // dispatch(setCurrentNavSelectID([...selectTemplatesData].find(item => item.value === value)?.id));
                // dispatch(setCurrentCategoryID([...selectTemplatesData].find(item => item.value === value)?.id));
                break;
            case value:
                dispatch(filterTodosDataByCategory({ category: `#${value}` }));

                dispatch(setTitle({ title: value.charAt(0).toUpperCase() + value.slice(1) }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID }));

                // dispatch(setCurrentNavSelectID([...selectTemplatesData].find(item => item.value === value)?.id));
                // dispatch(setCurrentCategoryID([...selectTemplatesData].find(item => item.value === value)?.id));
                break;
            default:
                dispatch(filterTodosDataByCategory({ category: 'all' }));

                dispatch(setTitle({ title: 'All' }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID }));

                // dispatch(setCurrentNavSelectID([...selectTemplatesData].find(item => item.value === value)?.id));
                // dispatch(setCurrentCategoryID([...selectTemplatesData].find(item => item.value === value)?.id));
        };
    };

    return (
        <select className="nav-select"
            onChange={e => !isDataTLoading && !error && selectMenuHandler(e.target.value)}
            defaultValue={selectTemplatesData[0].value}
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