import React from 'react';

import { Itodo } from '../../types/todoTypes';

// /. imports

interface propTypes {
    id: number,
    title: string;
    category: string;
    status: string;
    todosData: Itodo[];
    setTodosData: (arg: Itodo[]) => void
}

// /. interfaces

const TodoTemplate: React.FC<propTypes> = ({ id, title, category, status, todosData, setTodosData }) => {

    const deleteTodo = (): void => {
        setTodosData(todosData.filter(item => item.id !== id));
    };

    return (
        <li className="todo__item" data-category={category} data-status={status}>
            <label className={`todo__label ${status}`} title={title}>
                <input className="todo__checkbox" type="checkbox" />
                <span className="todo__checkbox--fake"></span>
                {title}
            </label>
            <span className="todo__category">{category}</span>
            <button className="todo__button" onClick={deleteTodo}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.66667 3.33333L6.25 1H9.75L10.3333 3.33333M15 3.33333H2.16667L3.33333 17.3333H12.6667L13.8333 3.33333H1H15ZM8 6.83333V13.8333V6.83333ZM10.9167 6.83333L10.3333 13.8333L10.9167 6.83333ZM5.08333 6.83333L5.66667 13.8333L5.08333 6.83333Z" stroke="#FF0000" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </li>
    );
};

export default TodoTemplate;