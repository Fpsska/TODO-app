import React, { useState } from 'react';

import { Iselect } from '../../types/selectTypes';

import { Itodo } from '../../types/todoTypes';
import { Inav } from '../../types/navTypes';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

interface propTypes {
    todosData: Itodo[];
    setFilteredTodosData: (arg: Itodo[]) => void;
    setTitle: (arg: string) => void;
    navTemplatesData: Inav[];
    setNavTemplatesData: (arg: Inav[]) => void;
    currentNavID: number
}

// /. interfaces

const SelectMenu: React.FC<propTypes> = (props) => {

    const {
        todosData,
        setFilteredTodosData,
        setTitle,
        navTemplatesData,
        setNavTemplatesData,
        currentNavID
    } = props;

    const [selectTemplatesData] = useState<Iselect[]>([
        {
            id: 1,
            text: 'All',
            value: 'all',
            isActive: true
        },
        {
            id: 2,
            text: 'Groceries',
            value: 'groceries',
            isActive: false
        },
        {
            id: 3,
            text: 'College',
            value: 'college',
            isActive: false
        },
        {
            id: 4,
            text: 'Payments',
            value: 'payments',
            isActive: false
        }
    ]);

    const selectMenuHandler = (value: string): void => {
        switch (value) {
            case 'all':
                setNavTemplatesData(navTemplatesData.map(item => item.id === currentNavID ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData(todosData);

                setTitle('All');
                break;
            case 'groceries':
                setNavTemplatesData(navTemplatesData.map(item => item.id === currentNavID ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${value}`));

                setTitle('Groceries');
                break;
            case 'college':
                setNavTemplatesData([...navTemplatesData].map(item => item.id === currentNavID ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${value}`));

                setTitle('College');
                break;
            case 'payments':
                setNavTemplatesData([...navTemplatesData].map(item => item.id === currentNavID ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${value}`));

                setTitle('Payments');
                break;
            default:
                setNavTemplatesData([...navTemplatesData].map(item => item.category === 'all' ? { ...item, isActive: true } : { ...item, isActive: false }));   // find by categiry name
                setFilteredTodosData(todosData);
                setTitle('All');
        };
    };

    return (
        <select className="nav-select" onChange={e => selectMenuHandler(e.target.value)} defaultValue={selectTemplatesData[0].value} >
            {selectTemplatesData.map((item: Iselect) => {
                return (
                    <SelectTemplate
                        key={item.id}
                        text={item.text}
                        value={item.value}
                        isActive={item.isActive}
                    />
                );
            })}
        </select>
    );
};

export default SelectMenu;