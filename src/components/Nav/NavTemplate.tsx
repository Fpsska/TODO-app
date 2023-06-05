import React, { useState, useEffect } from 'react';

import {
    switchNavActiveStatus,
    setSelectNavOption,
    setCurrentNavID
} from 'app/slices/navSlice';

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

    // /. hooks

    const isNavLinkDisabled = isTodosDataLoading || error;

    const linkContent = `${text} (${
        makeStringFormatting(category) === 'all' ? todosData.length : todoCount
    })`;

    // /. variables

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

        dispatch(setTaskTitleValue({ title: category })); // update text content of title__form
        dispatch(setCurrentNavID(id));
    };

    // /. functions

    useEffect(() => {
        // set current todo items count for each category
        const array = todosData.filter(
            item =>
                makeStringFormatting(item.category) ===
                makeStringFormatting(category)
        );
        setTodoCount(array.length);
    }, [todosData, category]);

    // /. effects

    return (
        <li className="nav__item">
            <a
                className={`nav__link ${isActive ? 'active' : ''} ${
                    isNavLinkDisabled ? 'disabled' : ''
                }`}
                href={link}
                onClick={() => !isNavLinkDisabled && onNavLinkClick()}
            >
                <span title={linkContent}>{linkContent}</span>
            </a>
        </li>
    );
};

export default NavTemplate;
