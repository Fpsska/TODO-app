import React, { useState, useEffect, useContext } from 'react';

import { MyContext } from '../Layout/Layout';

import { Inav } from '../../types/navTypes';

// /. imports

interface propTypes {
    id: number;
    text: string;
    category: string;
    link: string;
    isActive: boolean;

    navTemplatesData: Inav[];
    setNavTemplatesData: (arg: Inav[]) => void;
    setCurrentNavID: (arg: number) => void;
    setCurrentCategoryID: (arg: number) => void;
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
        setCurrentNavID,
        setCurrentCategoryID
    } = props;

    const {
        todosData,
        setFilteredTodosData,
        isDataTLoading,
        error,
        setTitle
    } = useContext(MyContext);

    // console.log(title);

    const [todoCount, setTodoCount] = useState<number>(0);


    useEffect(() => { // set current todo items count for each category
        const array = [...todosData].filter(item => item.category.toLocaleLowerCase() === `#${category}`);
        setTodoCount(array.length);
    }, [todosData]);


    const filterTodoItems = (): void => {
        switch (category) {
            case 'all':
                setNavTemplatesData(navTemplatesData.map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData(todosData);

                setTitle(text);
                setCurrentNavID(id);
                setCurrentCategoryID(id);
                break;
            case category:
                setNavTemplatesData(navTemplatesData.map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${category}`));

                setTitle(text);
                setCurrentNavID(id);
                setCurrentCategoryID(id);
                break;
            default:
                setNavTemplatesData([...navTemplatesData].map(item => item.category === 'all' ? { ...item, isActive: true } : { ...item, isActive: false }));

                setFilteredTodosData(todosData);

                setTitle('All');
                setCurrentNavID(id);
                setCurrentCategoryID(id);
        }
    };

    return (
        <li className="nav__item">
            <a className={isActive ? 'nav__link active' : isDataTLoading || error ? 'nav__link disabled' : 'nav__link'}
                href={link}
                onClick={() => !isDataTLoading && !error && filterTodoItems()}
            >
                <span title={`${text} (${category === 'all' ? todosData.length : todoCount})`}
                >
                    {`${text} (${category === 'all' ? todosData.length : todoCount})`}
                </span>
            </a>
        </li>
    );
};

export default NavTemplate;