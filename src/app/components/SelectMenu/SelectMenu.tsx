import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import {
    setCurrentCategoryID,
    switchTodosItemEditableStatus,
    setFilterProp,
    setInputTitleValue
} from '../../../store/slices/todoSlice';
import {
    setCurrentNavSelectID,
    setSelectNavOption,
    switchNavActiveStatus
} from '../../../store/slices/navSlice';

import { Iselect } from '../../types/selectTypes';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

const SelectMenu: React.FC = () => {

    const {
        todosData,
        filterProp,
        currentTodoID,
        isTodosDataLoading,
        currentTodosCount,
        error
    } = useAppSelector(state => state.todoSlice);

    const { selectTemplatesData, selectNavOption, navTemplatesData } = useAppSelector(state => state.navSlice);

    const dispatch = useAppDispatch();

    const selectMenuHandler = (value: string, e: any): void => {
        switch (value) {
            case 'All':
                dispatch(setFilterProp({ filterProp: 'all' })); // update prop for filter.ts func for real-time filtering
                dispatch(setSelectNavOption({ option: 'All' })); // switch nav-select value 
                dispatch(switchNavActiveStatus({ id: [...navTemplatesData].filter(item => item.category === 'all')[0].id, status: true })); // two-way communication/sync with NavTemplate.tsx for correct filtering

                dispatch(setInputTitleValue({ title: 'All' })); // update text comtent of title__input 

                dispatch(setCurrentNavSelectID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id })); // for edit current item of selectTemplatesData[]
                dispatch(setCurrentCategoryID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id })); // for edit category value of current item of todosData[] 
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false })); // disable editable todo when filtering todosData[]
                break;
            case value:
                dispatch(setFilterProp({ filterProp: value.toLowerCase().trim() }));
                dispatch(setSelectNavOption({ option: value }));
                dispatch(switchNavActiveStatus({ id: [...navTemplatesData].filter(item => item.category === value.toLocaleLowerCase())[0].id, status: true }));

                dispatch(setInputTitleValue({ title: [...e.target.childNodes].find(item => item.value === value).innerText }));

                dispatch(setCurrentNavSelectID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
                dispatch(setCurrentCategoryID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));
                break;
            default:
                dispatch(setFilterProp({ filterProp: 'all' }));
                dispatch(setSelectNavOption({ option: 'All' }));
                dispatch(switchNavActiveStatus({ id: [...navTemplatesData].filter(item => item.category === 'all')[0].id, status: true }));

                dispatch(setInputTitleValue({ title: [...e.target.childNodes].find(item => item.value === value).innerText }));

                dispatch(setCurrentNavSelectID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
                dispatch(setCurrentCategoryID({ id: [...selectTemplatesData].filter(item => item.value === value)[0].id }));
                dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));
        };
    };


    return (
        <select className="nav-select"
            value={selectNavOption}
            disabled={isTodosDataLoading || error}
            onChange={e => !isTodosDataLoading && !error && selectMenuHandler(e.target.value, e)}
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