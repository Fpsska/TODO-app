import React, { useState, useRef } from 'react';

import { Inav } from '../../types/navTypes';
import { Icategory } from '../../types/categoryTypes';
import { Iselect } from '../../types/selectTypes';

import './categoryForm.scss';

// /. imports 

interface propTypes {
    navTemplatesData: Inav[];
    setNavTemplatesData: (arg: Inav[]) => void;
    categoryTemplatesData: Icategory[];
    setCategoryTemplatesData: (arg: Icategory[]) => void;
    selectTemplatesData: Iselect[];
    setSelectTemplatesData: (arg: Iselect[]) => void;
    isFormVisible: boolean;
    setFormVisibleStatus: (arg: boolean) => void
}

// /. interfaces

const CategoryForm: React.FC<propTypes> = (props) => {

    const {
        navTemplatesData,
        setNavTemplatesData,
        categoryTemplatesData,
        setCategoryTemplatesData,
        selectTemplatesData,
        setSelectTemplatesData,
        isFormVisible,
        setFormVisibleStatus
    } = props;

    // const [isFormVisible, setFormVisibleStatus] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const formRef = useRef<HTMLFormElement>(null!);

    const formSubmitHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault();

        inputValue && setNavTemplatesData([...navTemplatesData, // update navTemplatesData[]
        {
            id: +new Date(),
            text: inputValue.charAt(0).toUpperCase() + inputValue.slice(1).trim(),
            category: inputValue.trim().toLocaleLowerCase(),
            link: '#',
            isActive: false
        }]);

        inputValue && setCategoryTemplatesData([...categoryTemplatesData, // update categoryTemplatesData[]
        {
            id: +new Date(),
            text: inputValue.trim(),
            value: inputValue.trim().toLocaleLowerCase(),
            name: 'category'
        }
        ]);

        inputValue && setSelectTemplatesData([...selectTemplatesData,   // update selectTemplatesData[]
        {
            id: +new Date(),
            text: inputValue.charAt(0).toUpperCase() + inputValue.slice(1).trim(),
            value: inputValue.trim().toLocaleLowerCase()
        }
        ]);

        setFormVisibleStatus(false);

        // clear the input value after the extend arrays logic has worked
        formRef.current.reset();
        setInputValue('');
    };

    return (
        <div className="category">

            <button className={isFormVisible ? 'category__button visible' : 'category__button'} onClick={() => setFormVisibleStatus(!isFormVisible)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Add group</span>
            </button>

            {isFormVisible &&
                <form ref={formRef} className="category__form" onSubmit={e => formSubmitHandler(e)} >

                    <input className="input category__input"
                        type="text"
                        placeholder="Name of new group"
                        onChange={e => setInputValue(e.target.value)}
                        required
                    />

                    <button className="category__button category__button--form">Create</button>

                </form>
            }
        </div>
    );
};

export default CategoryForm;