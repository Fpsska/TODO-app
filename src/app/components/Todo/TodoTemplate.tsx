import React from 'react';

// /. imports

interface propTypes {
    text: string,
    category: string,
    status: string
}

// /. interfaces

const TodoTemplate: React.FC<propTypes> = ({ text, category, status }) => {
    return (
        <li className="todo__item" data-category={category} data-status={status}>
            <label className="todo__label" >
                <input className="todo__checkbox" type="checkbox" />
                <span className="todo__checkbox--fake"></span>
                {text}
            </label>
            <span className="todo__category">{category}</span>
            <button className="todo__button">x</button>
        </li>
    );
};

export default TodoTemplate;