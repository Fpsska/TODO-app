import React from 'react';

import { Inav } from '../../types/navTypes';
import { Itodo } from '../../types/todoTypes';
import { Icategory } from '../../types/categoryTypes';

import './titleForm.scss'

// /. imports

interface propTypes {
    isEditable: boolean;
    inputTitleValue: string;
    setInputTitleValue: (arg: string) => void;
    navTemplatesData: Inav[];
    setNavTemplatesData: (arg: Inav[]) => void;
    currentNavID: number;
    todosData: Itodo[];
    setTodosData: (arg: Itodo[]) => void;
    setEditableStatus: (arg: boolean) => void;
    categoryTemplatesData: Icategory[];
    setCategoryTemplatesData: (arg: Icategory[]) => void;
    currentCategoryID: number
}

const TitleForm: React.FC<propTypes> = (props) => {

    const {
        isEditable,
        inputTitleValue,
        setInputTitleValue,
        navTemplatesData,
        setNavTemplatesData,
        currentNavID,
        todosData,
        setTodosData,
        setEditableStatus,
        categoryTemplatesData,
        setCategoryTemplatesData,
        currentCategoryID
    } = props;


    const formSubmitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        console.log(inputTitleValue)
        inputTitleValue && setNavTemplatesData([...navTemplatesData].map(item => { // update text, category in navTemplatesData[]
            if (item.id === currentNavID) {
                return {
                    ...item,
                    text: inputTitleValue,
                    category: inputTitleValue.toLocaleLowerCase().trim()
                };
            }
            return item;
        }));

        const currentCategory = `#${[...navTemplatesData].find(item => item.id === currentNavID)?.category}`; // return string 'all/college'

        inputTitleValue && setTodosData([...todosData].map(item => { // update category name of todoData[] items of current category value
            if (item.category.toLocaleLowerCase() === currentCategory) {
                // console.log('item.category', item.category)
                return {
                    ...item,
                    category: inputTitleValue ? `#${(inputTitleValue.charAt(0).toUpperCase() + inputTitleValue.slice(1)).trim().replace(/#/gi, '')}` : '',
                };
            }
            return item;
        }));


        inputTitleValue && setCategoryTemplatesData([...categoryTemplatesData].map(item => { // // update text, value in categoryTemplatesData[]
            if (item.id === currentCategoryID) {
                return {
                    ...item,
                    text: inputTitleValue.toLocaleLowerCase().trim(), // display in UI
                    value: inputTitleValue.toLocaleLowerCase().trim() // logic
                }
            }
            return item;
        }))

        // disable editing after submit form
        setEditableStatus(false);
    };

    return (
        <div className="title">
            <form className="title__form" onSubmit={formSubmitHandler}>
                <input
                    className={isEditable ? 'title__input editable' : 'title__input'}
                    type="text"
                    title={`${inputTitleValue} Tasks`}
                    value={inputTitleValue}
                    onChange={e => setInputTitleValue(e.target.value)} />
            </form>
        </div>
    );
};

export default TitleForm;