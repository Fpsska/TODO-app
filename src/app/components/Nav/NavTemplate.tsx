import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';

import {
    setCurrentCategoryID,
    setCurrentTodosCount,
    setInputTitleValue,
    setFilterProp,
} from '../../../store/slices/todoSlice';
import {
    switchNavActiveStatus,
    setSelectNavOption
} from '../../../store/slices/navSlice';

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

        setEditableStatus,
    } = props;

    const { todosData, error, isTodosDataLoading } = useAppSelector(state => state.todoSlice);

    const [todoCount, setTodoCount] = useState<number>(0);

    const dispatch = useAppDispatch();

    useEffect(() => { // set current todo items count for each category
        const array = [...todosData].filter(item => item.category.toLowerCase().trim() === category.toLowerCase().trim());
        setTodoCount(array.length);
    }, [todosData]);


    const filterTodoItems = (): void => {
        switch (category) {
            case category:
                dispatch(setFilterProp({ filterProp: category.toLowerCase().trim() })); // update prop for filter.ts func for real-time filtering
                dispatch(switchNavActiveStatus({ id, status: true }));
                dispatch(setSelectNavOption({ option: category.toLowerCase().trim() })); // two-way sync with SelectMenu.tsx for correct filtering

                dispatch(setCurrentCategoryID({ id })); // for edit category value of current item of todosData[] 

                dispatch(setInputTitleValue({ title: text.trim() }));   // update text content of title__input
                setEditableStatus(false);   // controle titleForm visible condition
                break;
            default:
                dispatch(setFilterProp({ filterProp: 'all' }));
                dispatch(switchNavActiveStatus({ id, status: true }));
                dispatch(setSelectNavOption({ option: 'All' }));

                dispatch(setCurrentCategoryID({ id }));

                dispatch(setInputTitleValue({ title: 'All' }));
                setEditableStatus(false);
        }
    };

    return (
        <li className="nav__item">
            <a className={isActive ? 'nav__link active' : isTodosDataLoading || error ? 'nav__link disabled' : 'nav__link'}
                href={link}
                onClick={() => !isTodosDataLoading && !error && filterTodoItems()}
            >
                <span title={`${text} (${category.toLowerCase().trim() === 'all' ? todosData.length : todoCount})`}
                >
                    {`${text} (${category.toLowerCase().trim() === 'all' ? todosData.length : todoCount})`}
                </span>
            </a>
        </li>
    );
};

export default NavTemplate;