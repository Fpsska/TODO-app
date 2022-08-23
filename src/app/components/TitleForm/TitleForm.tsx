import React, { useEffect } from 'react';

import { useAppDispatch } from '../../../store/hooks';

import {
    editCurrentCategoryTemplateItem,
    editCategoryOFCurrentTodosDataItem,
    setInputTitleValue,
    setFilterProp
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
    filterProp: string;
    navTemplatesData: any[];
    selectTemplatesData: any[]
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
        filterProp,
        navTemplatesData,
        selectTemplatesData
    } = props;

    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     console.log('filterProp', filterProp)
    // }, [filterProp])

    // console.log(`1221${filterProp}213123`.replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase() + filterProp.slice(2))
    // console.log(filterProp.replace(/[^A-Za-z]/g, ''))

    const formSubmitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        dispatch(setFilterProp({ filterProp: `#${inputTitleValue.toLocaleLowerCase().trim()}` })); // update filterProp

        dispatch(editCurrentNavTemplateItem({  // update text, category in navTemplatesData[]
            id: [...navTemplatesData].find(item => item.category === filterProp.replace(/[^A-Za-z]/g, '')).id,
            text: inputTitleValue,
            category: inputTitleValue.toLocaleLowerCase().trim()
        }));

        dispatch(editCurrentNavSelectTemplateItem({ // update text, value in selectTemplatesData[]
            id: [...selectTemplatesData].find(item => item.value === filterProp.replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase() + filterProp.slice(2)).id,
            text: inputTitleValue, // displayed in UI
            value: inputTitleValue.trim() // logic
        }));

        dispatch(editCurrentCategoryTemplateItem({  // update text, value in categoryTemplatesData[] / Modal.tsx
            id: currentCategoryID,
            text: inputTitleValue.toLocaleLowerCase().trim(), // displayed in UI
            value: inputTitleValue.toLocaleLowerCase().trim() // logic
        }));

        dispatch(editCategoryOFCurrentTodosDataItem({ // update category value of each todosData[] item who prev category is equal prev title value
            categoryProp: filterProp,
            categoryValue: inputTitleValue ? `#${(inputTitleValue.charAt(0).toUpperCase() + inputTitleValue.slice(1)).trim().replace(/#/g, '')}` : ''
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