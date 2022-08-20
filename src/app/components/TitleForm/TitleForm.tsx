import React from 'react';

import { useAppDispatch } from '../../../store/hooks';

import {
    editCurrentNavTemplateItem,
    editCurrentNavSelectTemplateItem,
    editCurrentCategoryTemplateItem,
    editCategoryOFCurrentTodosDataItem
} from '../../../store/slices/todoSlice';

import { Inav } from '../../types/navTypes';
import { Itodo } from '../../types/todoTypes';
import { Icategory } from '../../types/categoryTypes';
import { Iselect } from '../../types/selectTypes';

import './titleForm.scss'

// /. imports

interface propTypes {
    refEl: any;
    isEditable: boolean;
    inputTitleValue: string;
    setEditableStatus: (arg: boolean) => void;
    setInputTitleValue: (arg: string) => void;
    todosData: Itodo[];
    navTemplatesData: Inav[];
    selectTemplatesData: Iselect[];
    currentNavID: number;
    currentNavSelectID: number
}

const TitleForm: React.FC<propTypes> = (props) => {

    const {
        refEl,
        isEditable,
        inputTitleValue,
        setInputTitleValue,
        setEditableStatus,
        todosData,
        navTemplatesData,
        selectTemplatesData,
        currentNavID,
        currentNavSelectID
    } = props;

    const dispatch = useAppDispatch();


    const formSubmitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        dispatch(editCurrentNavTemplateItem({  // update text, category in navTemplatesData[]
            text: inputTitleValue,
            category: inputTitleValue.toLocaleLowerCase().trim()
        }));

        dispatch(editCurrentNavSelectTemplateItem({ // update text, value in selectTemplatesData[]
            text: inputTitleValue, // displayed in UI
            value: inputTitleValue.toLocaleLowerCase().trim() // logic
        }));

        dispatch(editCurrentCategoryTemplateItem({  // update text, value in categoryTemplatesData[]
            text: inputTitleValue.toLocaleLowerCase().trim(), // displayed in UI
            value: inputTitleValue.toLocaleLowerCase().trim() // logic
        }));


        const currentCategoryFromNav = `#${[...navTemplatesData].find(item => item.id === currentNavID)?.category}`; // return string 'all/college'
        const currentCategoryFromNavSelect = `#${[...selectTemplatesData].find(item => item.id === currentNavSelectID)?.value}`;

        // setTodosData([...todosData].map(item => { // update category name of todoData[] items of current category value
        //     if (item.category.toLocaleLowerCase() === currentCategoryFromNav) {
        //         return {
        //             ...item,
        //             category: inputTitleValue ? `#${(inputTitleValue.charAt(0).toUpperCase() + inputTitleValue.slice(1)).trim().replace(/#/gi, '')}` : '',
        //         };
        //     }
        //     if (item.category.toLocaleLowerCase() === currentCategoryFromNavSelect) {
        //         return {
        //             ...item,
        //             category: inputTitleValue ? `#${(inputTitleValue.charAt(0).toUpperCase() + inputTitleValue.slice(1)).trim().replace(/#/gi, '')}` : '',
        //         };
        //     }
        //     return item;
        // }));

        // [...todosData].map(item => {
        //     if (item.category.toLocaleLowerCase() === currentCategoryFromNav) {
        //         dispatch(editCategoryOFCurrentTodosDataItem({
        //             categoryValue: inputTitleValue ? `#${(inputTitleValue.charAt(0).toUpperCase() + inputTitleValue.slice(1)).trim().replace(/#/gi, '')}` : ''
        //         }));
        //     }
        //     if (item.category.toLocaleLowerCase() === currentCategoryFromNavSelect) {
        //         dispatch(editCategoryOFCurrentTodosDataItem({
        //             categoryValue: inputTitleValue ? `#${(inputTitleValue.charAt(0).toUpperCase() + inputTitleValue.slice(1)).trim().replace(/#/gi, '')}` : ''
        //         }));
        //     }
        // });

        dispatch(editCategoryOFCurrentTodosDataItem({
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
                        onChange={e => setInputTitleValue(e.target.value)} />
                }
            </form>
        </div>
    );
};

export default TitleForm;