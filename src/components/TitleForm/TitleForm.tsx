import React, { useState, useEffect, RefObject } from 'react';

import { Inav } from 'types/navTypes';

import { Icategory } from 'types/categoryTypes';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import {
    editCurrentCategoryTemplateItem,
    updateCategoryOfTodoItems,
    setTaskTitleValue,
    setFilterCompareValue
} from 'app/slices/todoSlice';

import {
    editCurrentNavTemplateItem,
    setSelectNavOption
} from 'app/slices/navSlice';

import { makeStringFormatting } from 'utils/helpers/makeStringFormatting';

import './titleForm.scss';

// /. imports

interface propTypes {
    inputRef: RefObject<HTMLInputElement>;
    isEditable: boolean;
    inputTitleValue: string;
    setEditableStatus: (arg: boolean) => void;
    filterCompareValue: string;
    navTemplatesData: Inav[];
    categoryTemplatesData: Icategory[];
}

const TitleForm: React.FC<propTypes> = props => {
    const {
        inputRef,
        isEditable,
        inputTitleValue,
        filterCompareValue,
        setEditableStatus,
        categoryTemplatesData
    } = props;

    const { currentNavID } = useAppSelector(state => state.navSlice);

    const [inputValue, setInputValue] = useState<string>(inputTitleValue);

    const dispatch = useAppDispatch();

    // /. hooks

    const isGeneralTodoGroup = makeStringFormatting(inputValue) === 'all';

    // /. variables

    const formSubmitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        dispatch(setTaskTitleValue({ title: inputValue.trim() })); // update title__form text content value

        dispatch(
            setFilterCompareValue({
                filterCompareValue: makeStringFormatting(inputValue)
            })
        ); // correct filtering after updating compared value

        dispatch(
            setSelectNavOption({
                option: makeStringFormatting(inputValue)
            })
        ); // overwrite actual option value

        dispatch(
            editCurrentNavTemplateItem({
                id: currentNavID,
                text: inputValue.trim(),
                category: makeStringFormatting(inputValue)
            })
        );
        // update text, category of actual nav element

        dispatch(
            updateCategoryOfTodoItems({
                categoryProp: filterCompareValue,
                newCategoryValue: makeStringFormatting(inputValue)
            })
        ); // overwrite category value for  necessary todos

        setEditableStatus(false); // disable editing after submit form
    };

    const onEditButtonClick = (): void => {
        setEditableStatus(!isEditable);
    };

    // /. functions

    useEffect(() => {
        // save current input value when user is leave from editing mode without saving
        if (!isEditable) {
            const capitalizedTitle =
                inputTitleValue.charAt(0).toUpperCase() +
                inputTitleValue.slice(1);
            setInputValue(capitalizedTitle.trimStart());
        }
    }, [isEditable, inputTitleValue]);

    useEffect(() => {
        // update categoryTemplatesData
        if (isGeneralTodoGroup) return;

        const targetCategoryItem = categoryTemplatesData.find(
            item =>
                makeStringFormatting(item.value) ===
                makeStringFormatting(inputValue)
        );

        dispatch(
            editCurrentCategoryTemplateItem({
                id: targetCategoryItem
                    ? targetCategoryItem.id
                    : categoryTemplatesData[0].id,
                value: makeStringFormatting(inputValue)
            })
        );
    }, [inputValue, categoryTemplatesData, isGeneralTodoGroup]);

    // /. effects

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
                        value={inputValue}
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
