import React, { useState, useEffect } from 'react';

import { switchNavActiveStatus, setSelectNavOption } from 'app/slices/navSlice';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { setTaskTitleValue, setFilterCompareValue } from 'app/slices/todoSlice';

import { makeStringFormatting } from 'utils/helpers/makeStringFormatting';

// /. imports

interface propTypes {
    id: number;
    text: string;
    category: string;
    link?: string;
    isActive?: boolean;
}

// /. interfaces

const NavTemplate: React.FC<propTypes> = props => {
    const { id, text, category, link, isActive } = props;

    const { todosData, error, isTodosDataLoading } = useAppSelector(
        state => state.todoSlice
    );

    const [todoCount, setTodoCount] = useState<number>(0);

    const dispatch = useAppDispatch();

    useEffect(() => {
        // set current todo items count for each category
        const array = todosData.filter(
            item =>
                item.category.toLowerCase().trim() ===
                category.toLowerCase().trim()
        );
        setTodoCount(array.length);
    }, [todosData, category]);

    const isNavLinkAvaliable = !isTodosDataLoading && !error;

    const linkContent = `${text} (${
        makeStringFormatting(category) === 'all' ? todosData.length : todoCount
    })`;

    const onNavLinkClick = (): void => {
        dispatch(
            setFilterCompareValue({
                filterCompareValue: makeStringFormatting(category)
            })
        ); // update prop for real-time filtering

        dispatch(switchNavActiveStatus({ id, status: true }));
        dispatch(
            setSelectNavOption({
                option: makeStringFormatting(category)
            })
        ); // for equaled displaying nav UI (mobile/desktop)

        // dispatch(setCurrentCategoryID({ id })); // for edit category value of current item of todosData[]

        dispatch(setTaskTitleValue({ title: category })); // update text content of title__form
    };

    return (
        <li className="nav__item">
            <a
                className={`nav__link ${isActive ? 'active' : ''} ${
                    isTodosDataLoading || error ? 'disabled' : ''
                }`}
                href={link}
                onClick={() => isNavLinkAvaliable && onNavLinkClick()}
            >
                <span title={linkContent}>{linkContent}</span>
            </a>
        </li>
    );
};

export default NavTemplate;
