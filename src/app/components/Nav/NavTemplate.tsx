import React, { useState, useEffect } from 'react';

import { Inav } from '../../types/navTypes';
import { Itodo } from '../../types/todoTypes';

// /. imports

interface propTypes {
    id: number;
    text: string;
    category: string;
    link: string;
    isActive: boolean;
    navTemplatesData: Inav[];
    setNavTemplatesData: (arg: Inav[]) => void;
    todosData: Itodo[];
    setTodosData: (arg: Itodo[]) => void;
    filteredTodosData: Itodo[];
    setFilteredTodosData: (arg: Itodo[]) => void;
    setTitle: (arg: string) => void;
    isDataTLoading: boolean;
    error: any
}

// /. interfaces

const NavTemplate: React.FC<propTypes> = (props) => {

    const {
        id,
        text,
        category,
        link,
        isActive,
        navTemplatesData,
        setNavTemplatesData,
        todosData,
        setTodosData,
        filteredTodosData,
        setFilteredTodosData,
        setTitle,
        isDataTLoading,
        error
    } = props;

    const [todoCount, setTodoCount] = useState<number>(0);

    useEffect(() => { // set current todo items count for each category
        const array = [...todosData].filter(item => item.category.toLocaleLowerCase() === `#${category}`);
        setTodoCount(array.length);
    }, [todosData]);

    // SAVE TODO DATA IN FILTERED DATA

    const filterTodoItems = (): void => {
        switch (category) {
            case 'all':
                setNavTemplatesData(navTemplatesData.map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData(todosData);

                setTitle(text);
                break;
            case 'groceries':
                setNavTemplatesData(navTemplatesData.map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${category}`));

                setTitle(text); // 
                break;
            case 'college':
                setNavTemplatesData([...navTemplatesData].map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${category}`));

                setTitle(text);
                break;
            case 'payments':
                setNavTemplatesData([...navTemplatesData].map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${category}`));

                setTitle(text);
                break;
            default:
                setNavTemplatesData([...navTemplatesData].map(item => item.category === 'all' ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData(todosData);

                setTitle('All');
        }
    };

    return (
        <li className="nav__item">
            <a className={isActive ? 'nav__link active' : isDataTLoading || error ? 'nav__link disabled' : 'nav__link'}
                href={link}
                onClick={() => !isDataTLoading && !error && filterTodoItems()}
            >
                {text}
                {' '}
                <span>({category === 'all' ? todosData.length : todoCount})</span>
            </a>
        </li>
    );
};

export default NavTemplate;