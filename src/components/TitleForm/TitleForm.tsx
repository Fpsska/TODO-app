import React, { useState, useEffect, RefObject } from 'react';

import { Inav } from 'types/navTypes';

import { Icategory } from 'types/categoryTypes';

import { Iselect } from 'types/selectTypes';

import { useAppDispatch } from 'app/hooks';

import { getCurrentArrItem } from 'utils/helpers/getCurrentArrItem';

import {
    editCurrentCategoryTemplateItem,
    editCategoryOFCurrentTodosDataItem,
    setTaskTitleValue,
    setFilterCompareValue
} from 'app/slices/todoSlice';
import {
    editCurrentNavTemplateItem,
    editCurrentNavSelectTemplateItem,
    setSelectNavOption
} from 'app/slices/navSlice';

import './titleForm.scss';

// /. imports

interface propTypes {
    inputRef: RefObject<HTMLInputElement>;
    isEditable: boolean;
    inputTitleValue: string;
    setEditableStatus: (arg: boolean) => void;
    filterCompareValue: string;
    navTemplatesData: Inav[];
    selectTemplatesData: Iselect[];
    categoryTemplatesData: Icategory[];
}

const TitleForm: React.FC<propTypes> = props => {
    const {
        inputRef,
        isEditable,
        inputTitleValue,
        setEditableStatus,
        filterCompareValue,
        navTemplatesData,
        selectTemplatesData,
        categoryTemplatesData
    } = props;

    const [inputValue, setInputValue] = useState<string>(inputTitleValue);

    const dispatch = useAppDispatch();

    const isGeneralTodoGroup = inputValue.toLowerCase().trim() === 'all';

    const formSubmitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        dispatch(
            setFilterCompareValue({
                filterCompareValue: inputValue.toLowerCase().trim()
            })
        ); // update filterCompareValue
        dispatch(setTaskTitleValue({ title: inputValue.trim() })); // update title__form text content value

        dispatch(
            editCurrentNavTemplateItem({
                // update text, category in navTemplatesData[]
                id: getCurrentArrItem(
                    navTemplatesData,
                    'category',
                    filterCompareValue
                )?.id,
                text: inputValue.trim(),
                category: inputValue.trim()
            })
        );

        dispatch(
            editCurrentNavSelectTemplateItem({
                // update text, value in selectTemplatesData[]
                id: getCurrentArrItem(
                    selectTemplatesData,
                    'value',
                    filterCompareValue
                )?.id,
                text: inputValue.trim(), // displayed in UI
                value: inputValue.trim() // logic
            })
        );
        dispatch(
            setSelectNavOption({ option: inputValue.toLowerCase().trim() })
        ); // switch to actual option after update

        dispatch(
            editCurrentCategoryTemplateItem({
                // update text, value in categoryTemplatesData[] / Modal.tsx
                id: getCurrentArrItem(
                    categoryTemplatesData,
                    'value',
                    filterCompareValue
                )?.id,
                text: inputValue.trim(), // displayed in UI
                value: inputValue.toLowerCase().trim() // logic
            })
        );

        dispatch(
            editCategoryOFCurrentTodosDataItem({
                // update category value of each todosData[] item who prev category is equal prev title value
                categoryProp: filterCompareValue,
                categoryValue: inputValue ? inputValue.toLowerCase().trim() : ''
            })
        );

        // disable editing after submit form
        setEditableStatus(false);
    };

    const onEditButtonClick = (): void => {
        setEditableStatus(!isEditable);
    };

    useEffect(() => {
        setInputValue(inputTitleValue);
    }, [inputTitleValue]);

    useEffect(() => {
        // save current input value when user is leave from editing mode without saving
        if (!isEditable) {
            setInputValue(inputTitleValue);
        }
    }, [isEditable, inputTitleValue]);

    return (
        <div className="title">
            {isGeneralTodoGroup ? (
                <h2 className="title__text">All</h2>
            ) : (
                <form
                    className="title__form"
                    onSubmit={e => inputValue && formSubmitHandler(e)}
                    action="#"
                >
                    <input
                        ref={inputRef}
                        className={
                            isEditable
                                ? 'title__input editable'
                                : 'title__input'
                        }
                        type="text"
                        title={`${inputValue} Tasks`}
                        value={inputValue.trimStart()}
                        onChange={e => setInputValue(e.target.value)}
                    />
                </form>
            )}
            <>
                {!isGeneralTodoGroup && (
                    <button
                        className="title__button"
                        type="button"
                        aria-label="edit todo title group"
                        onClick={onEditButtonClick}
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
                                fill=""
                            />
                        </svg>
                    </button>
                )}
            </>
        </div>
    );
};

export default TitleForm;
