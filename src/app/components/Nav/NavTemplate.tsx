import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';

import {
    switchNavActiveStatus,
    setCurrentCategoryID,
    setCurrentNavID,
    setTitle
} from '../../../store/slices/todoSlice';

import { Inav } from '../../types/navTypes';

// /. imports

interface propTypes {
    id: number;
    text: string;
    category: string;
    link: string;
    isActive: boolean;

    setEditableStatus: (arg: boolean) => void
}

// /. interfaces

const NavTemplate: React.FC<propTypes> = (props) => {

    const {
        id,
        text,
        category,
        link,
        isActive,

        setEditableStatus
    } = props;

    const { todosData, navTemplatesData, error, isTodosDataLoading } = useAppSelector(state => state.todoSlice);

    const dispatch = useAppDispatch();

    const [todoCount, setTodoCount] = useState<number>(0);


    useEffect(() => { // set current todo items count for each category
        const array = [...todosData].filter(item => item.category.toLocaleLowerCase() === `#${category}`);
        setTodoCount(array.length);
    }, [todosData]);


    const filterTodoItems = (): void => {
        switch (category) {
            case 'all':
                dispatch(switchNavActiveStatus({ id }));

                setFilteredTodosData(todosData);

                dispatch(setTitle(text));
                setCurrentNavID(id);
                setCurrentCategoryID(id);
                setEditableStatus(false);
                break;
            case category:
                dispatch(switchNavActiveStatus({ id }));

                setFilteredTodosData([...todosData].filter(item => item.category.toLocaleLowerCase() === `#${category}`));

                dispatch(setTitle(text));
                setCurrentNavID(id);
                setCurrentCategoryID(id);
                setEditableStatus(false);
                break;
            default:
                dispatch(switchNavActiveStatus({ id }));

                setFilteredTodosData(todosData);

                dispatch(setTitle('All'));

                setCurrentNavID(id);
                setCurrentCategoryID(id);
                setEditableStatus(false);
        }
    };

    return (
        <li className="nav__item">
            <a className={isActive ? 'nav__link active' : isTodosDataLoading || error ? 'nav__link disabled' : 'nav__link'}
                href={link}
                onClick={() => !isTodosDataLoading && !error && filterTodoItems()}
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