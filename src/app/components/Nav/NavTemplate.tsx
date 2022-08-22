import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';

import {
    setCurrentCategoryID,
    setCurrentTodosCount,
    setTitle,
    setFilterProp,
} from '../../../store/slices/todoSlice';
import {
    switchNavActiveStatus,
    setCurrentNavID,
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

    const { todosData, currentTodosCount, error, isTodosDataLoading } = useAppSelector(state => state.todoSlice);

    const [todoCount, setTodoCount] = useState<number>(0);

    const dispatch = useAppDispatch();

    useEffect(() => { // set current todo items count for each category
        const array = [...todosData].filter(item => item.category.toLocaleLowerCase() === `#${category}`);
        setTodoCount(array.length);
    }, [todosData]);


    const filterTodoItems = (): void => {
        switch (category) {
            case 'all':
                dispatch(switchNavActiveStatus({ id, status: true }));

                dispatch(setSelectNavOption({ option: text })); // two-way communication/sync with SelectMenu.tsx for correct filtering
                dispatch(setFilterProp({ filterProp: `#${category}` })); // update prop for filter.ts func for real-time filtering

                dispatch(setTitle({ title: text })); // update title globally
                dispatch(setCurrentNavID({ id })); // for edit current item of navTemplatesData[] 
                dispatch(setCurrentCategoryID({ id })); // for edit category value of current item of todosData[] 
                setEditableStatus(false); // controle titleForm visible condition
                break;
            case category:
                dispatch(switchNavActiveStatus({ id, status: true }));

                dispatch(setSelectNavOption({ option: text }));
                dispatch(setFilterProp({ filterProp: `#${category}` }));

                dispatch(setTitle({ title: text }));
                dispatch(setCurrentNavID({ id }));
                dispatch(setCurrentCategoryID({ id }));
                setEditableStatus(false);
                break;
            default:
                dispatch(switchNavActiveStatus({ id, status: true }));

                dispatch(setSelectNavOption({ option: 'All' }));
                dispatch(setFilterProp({ filterProp: '#all' }));

                dispatch(setTitle({ title: 'All' }));
                dispatch(setCurrentNavID({ id }));
                dispatch(setCurrentCategoryID({ id }));
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