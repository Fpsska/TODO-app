import React from 'react';

import { useAppDispatch } from '../../../store/hooks';

import {
    editCurrentCategoryTemplateItem,
    editCategoryOFCurrentTodosDataItem,
    setInputTitleValue
} from '../../../store/slices/todoSlice';
import {
    editCurrentNavTemplateItem,
    editCurrentNavSelectTemplateItem,
} from '../../../store/slices/navSlice';

import './titleForm.scss'

// /. imports

interface propTypes {
    refEl: any;
    isEditable: boolean;
    inputTitleValue: string;
    setEditableStatus: (arg: boolean) => void;
    currentNavID: number;
    currentNavSelectID: number;
    currentCategoryID: number;
    filterProp: string
}

const TitleForm: React.FC<propTypes> = (props) => {

    const {
        refEl,
        isEditable,
        inputTitleValue,
        setEditableStatus,
        currentNavID,
        currentNavSelectID,
        currentCategoryID,
        filterProp
    } = props;

    const dispatch = useAppDispatch();

    const formSubmitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        dispatch(editCurrentNavTemplateItem({  // update text, category in navTemplatesData[]
            id: currentNavID,
            text: inputTitleValue,
            category: inputTitleValue.toLocaleLowerCase().trim()
        }));

        dispatch(editCurrentNavSelectTemplateItem({ // update text, value in selectTemplatesData[]
            id: currentNavSelectID,
            text: inputTitleValue, // displayed in UI
            value: inputTitleValue.toLocaleLowerCase().trim() // logic
        }));

        dispatch(editCurrentCategoryTemplateItem({  // update text, value in categoryTemplatesData[]
            id: currentCategoryID,
            text: inputTitleValue.toLocaleLowerCase().trim(), // displayed in UI
            value: inputTitleValue.toLocaleLowerCase().trim() // logic
        }));

        dispatch(editCategoryOFCurrentTodosDataItem({
            categoryProp: filterProp, // '#alln / #college'
            categoryValue: inputTitleValue ? `#${(inputTitleValue.charAt(0).toUpperCase() + inputTitleValue.slice(1)).trim().replace(/#/gi, '')}` : ''
        }));

        // disable editing after submit form
        setEditableStatus(false);
    };


    return (
        <div className="title">
            <form className="title__form" onSubmit={e => inputTitleValue && formSubmitHandler(e)}>
                {inputTitleValue === 'All' ?
                    <h1 className="title__input general">All</h1>
                    :
                    <input
                        ref={refEl}
                        className={isEditable ? 'title__input editable' : 'title__input'}
                        type="text"
                        title={`${inputTitleValue} Tasks`}
                        value={inputTitleValue}
                        onChange={e => dispatch(setInputTitleValue({ title: e.target.value }))} />
                }
            </form>
        </div>
    );
};

export default TitleForm;