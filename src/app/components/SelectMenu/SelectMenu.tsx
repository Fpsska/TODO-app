import React, { useState } from 'react';

import { Iselect } from '../../types/selectTypes';

import { Itodo } from '../../types/todoTypes';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

interface propTypes {
    todosData: Itodo[];
    setFilteredTodosData: (arg: Itodo[]) => void;
    setTitle: (arg: string) => void;
    isDataTLoading: boolean
}

// /. interfaces

const SelectMenu: React.FC<propTypes> = (props) => {

    const {
        todosData,
        setFilteredTodosData,
        setTitle,
        isDataTLoading
    } = props;

    const [selectTemplatesData] = useState<Iselect[]>([
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
    ]);

    const selectMenuHandler = (value: string): void => {
        switch (value) {
            case 'all':
                setFilteredTodosData(todosData);
                setTitle('All');
                break;
            case 'groceries':
                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${value}`));
                setTitle('Groceries');
                break;
            case 'college':
                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${value}`));
                setTitle('College');
                break;
            case 'payments':
                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${value}`));
                setTitle('Payments');
                break;
            default:
                setFilteredTodosData(todosData);
                setTitle('All');
        };
    };

    return (
        <select className="nav-select"
            onChange={e => selectMenuHandler(e.target.value)}
            defaultValue={selectTemplatesData[0].value}
            disabled={isDataTLoading}
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