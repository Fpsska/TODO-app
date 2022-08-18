import React, { useState } from 'react';

import './categoryForm.scss';

// /. imports 

const CategoryForm: React.FC = () => {

    const [isFormVisible, setFormVisibleStatus] = useState<boolean>(false);

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
                <form className="category__form" onSubmit={e => e.preventDefault()}>

                    <input className="input category__input" type="text" placeholder="Name of new group" />

                    <button className="category__button category__button--form">Create</button>

                </form>
            }
        </div>
    );
};

export default CategoryForm;