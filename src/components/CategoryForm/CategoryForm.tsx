import React, { useState, useRef } from 'react';

import {
    switchFormVisibleStatus,
    addNewCategoryItem
} from 'app/slices/todoSlice';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { addNavTemplateItem } from 'app/slices/navSlice';

import { generateUniqueID } from 'utils/helpers/generateUniqueID';
import { makeStringFormatting } from 'utils/helpers/makeStringFormatting';

import './categoryForm.scss';

// /. imports

const CategoryForm: React.FC = () => {
    const { isFormVisible, isTodosDataLoading, error } = useAppSelector(
        state => state.todoSlice
    );

    const dispatch = useAppDispatch();

    const [inputValue, setInputValue] = useState<string>('');

    const formRef = useRef<HTMLFormElement>(null!);

    const isFormAvailable = inputValue && !isTodosDataLoading && !error;
    const isControlsAvailable = !isTodosDataLoading && !error;

    const formSubmitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        dispatch(
            addNewCategoryItem({
                id: generateUniqueID(),
                name: 'category',
                value: makeStringFormatting(inputValue)
            })
        );

        dispatch(
            addNavTemplateItem({
                id: generateUniqueID(),
                text: inputValue.trim(),
                category: makeStringFormatting(inputValue),
                link: '#',
                isActive: false
            })
        );

        dispatch(switchFormVisibleStatus({ status: false }));

        // clear the input value after the extend arrays logic has worked
        formRef.current.reset();
        setInputValue('');
    };

    const onButtonShowClick = (): void => {
        dispatch(switchFormVisibleStatus({ status: !isFormVisible }));
    };

    return (
        <div className="category">
            <button
                className={
                    isFormVisible
                        ? 'category__button visible'
                        : 'category__button'
                }
                type="button"
                onClick={onButtonShowClick}
            >
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 1V11"
                        stroke="#868686"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M1 6H11"
                        stroke="#868686"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span>Add group</span>
            </button>

            {isFormVisible && (
                <form
                    ref={formRef}
                    className="category__form"
                    onSubmit={e => isFormAvailable && formSubmitHandler(e)}
                    action="#"
                >
                    <input
                        className="input category__input"
                        type="text"
                        placeholder="Name of new group"
                        onChange={e => setInputValue(e.target.value)}
                        disabled={!isControlsAvailable}
                        required
                    />

                    <button
                        className="category__button category__button--form"
                        disabled={!isControlsAvailable}
                    >
                        Create
                    </button>
                </form>
            )}
        </div>
    );
};

export default CategoryForm;
