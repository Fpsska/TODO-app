import React from 'react';

import { useAppDispatch } from 'app/hooks';

import {
    removeTodosItem,
    setCurrentTodoID,
    switchTodosItemCompleteStatus,
    switchTodosItemEditableStatus
} from 'app/slices/todoSlice';

// /. imports

interface propTypes {
    id: string;
    title: string;
    category: string;
    status: string;
    completed: boolean;
    editable: boolean;

    setModalVisibleStatus: (arg: boolean) => void;
}

// /. interfaces

const TodoTemplate: React.FC<propTypes> = props => {
    const {
        id,
        title,
        category,
        status,
        completed,
        editable,

        setModalVisibleStatus
    } = props;

    const dispatch = useAppDispatch();

    // /. hooks

    const isCategoryExisted = category && category !== 'none';

    // /. variables

    const handleCompleteStatus = (): void => {
        dispatch(switchTodosItemCompleteStatus({ id, status: completed }));
    };

    const onButtonEditClick = (): void => {
        setModalVisibleStatus(true);
        dispatch(setCurrentTodoID({ id }));

        dispatch(switchTodosItemEditableStatus({ id, status: true })); // set editable status
    };

    const onButtonDeleteClick = (): void => {
        dispatch(removeTodosItem({ id }));
    };

    // /. functions

    return (
        <li className="todo__item">
            <label
                className={`todo__label ${completed ? 'completed' : ''} ${
                    !category ? 'large' : ''
                }`}
                title={title}
            >
                <input
                    className="todo__checkbox"
                    type="checkbox"
                    readOnly
                    checked={completed}
                    onChange={handleCompleteStatus}
                />
                <span className="todo__checkbox--fake"></span>
                <span
                    className={
                        editable
                            ? 'todo__label-text editable'
                            : 'todo__label-text'
                    }
                >
                    {title}
                </span>
            </label>

            {isCategoryExisted ? (
                <span
                    className={`todo__category ${status}`}
                    title={`#${category}`}
                >
                    #{category}
                </span>
            ) : (
                <span
                    className={`todo__indicator ${status}`}
                    title="uncategorized"
                ></span>
            )}

            <div className="todo__controllers">
                <button
                    className="todo__button todo__button--edit"
                    onClick={onButtonEditClick}
                    aria-label="edit todo item"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.23 1H11.77L3.52002 9.25L3.35999 9.46997L1 13.59L2.41003 15L6.53003 12.64L6.75 12.48L15 4.22998V2.77002L13.23 1ZM2.41003 13.59L3.92004 10.59L5.37 12.04L2.41003 13.59ZM6.23999 11.53L4.46997 9.76001L12.47 1.76001L14.24 3.53003L6.23999 11.53Z"
                            fill="#C5C5C5"
                        />
                    </svg>
                </button>
                <button
                    className="todo__button todo__button--delete"
                    onClick={onButtonDeleteClick}
                    aria-label="delete todo item"
                >
                    <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.66667 3.33333L6.25 1H9.75L10.3333 3.33333M15 3.33333H2.16667L3.33333 17.3333H12.6667L13.8333 3.33333H1H15ZM8 6.83333V13.8333V6.83333ZM10.9167 6.83333L10.3333 13.8333L10.9167 6.83333ZM5.08333 6.83333L5.66667 13.8333L5.08333 6.83333Z"
                            stroke="#FF0000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </li>
    );
};

export default TodoTemplate;
