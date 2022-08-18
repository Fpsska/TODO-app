import React, { useState } from 'react';

import { Iselect } from '../../types/selectTypes';

import { Itodo } from '../../types/todoTypes';
import { Icategory } from '../../types/categoryTypes';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

interface propTypes {
    todosData: Itodo[];
    setFilteredTodosData: (arg: Itodo[]) => void;
    setTitle: (arg: string) => void;
    isDataTLoading: boolean;
    error: any;
    selectTemplatesData: Iselect[]
}

// /. interfaces

const SelectMenu: React.FC<propTypes> = (props) => {

    const {
        todosData,
        setFilteredTodosData,
        setTitle,
        isDataTLoading,
        error,
        selectTemplatesData
    } = props;


    const selectMenuHandler = (value: string): void => {
        switch (value) {
            case 'all':
                setFilteredTodosData(todosData);
                setTitle('All');
                break;
            case value:
                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${value}`));
                setTitle(value.charAt(0).toUpperCase() + value.slice(1));
                break;
            default:
                setFilteredTodosData(todosData);
                setTitle('All');
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