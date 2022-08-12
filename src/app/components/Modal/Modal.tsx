import React, { useState } from 'react';

import { Itodo } from '../../types/todoTypes';

import './modal.scss';

// /. imports 

interface propTypes {
    todosData: Itodo[],
    setTodosData: (arg: any[]) => any;
    setVisibleStatus: (arg: boolean) => void;
    currentTodoID: number
}

// /. interfaces

const Modal: React.FC<propTypes> = (props) => {

    const {
        todosData,
        setTodosData,
        setVisibleStatus,
        currentTodoID
    } = props;

    const [inputValue, setInputValue] = useState<string>('');
    const [inputRadioCategoryValue, setInputRadioCategoryValue] = useState<string>('');
    const [inputRadioStatusValue, setInputRadioStatusValue] = useState<string>('');

    const formSubmitHandler = (e: React.SyntheticEvent): any => {
        e.preventDefault();

        setTodosData([...todosData].map(item => {
            if (item.id === currentTodoID) {
                return {
                    ...item,
                    title: inputValue,                                                                                                                  // uncategorized
                    category: inputRadioCategoryValue ? `#${inputRadioCategoryValue.charAt(0).toUpperCase() + inputRadioCategoryValue.slice(1)}` : '', // set upperCase for 1st letter of getted inputRadioValue
                    status: inputRadioStatusValue,
                    editable: false
                };
            } else {
                return item;
            }
        }));
        setVisibleStatus(false);
    };

    const closeModal = (): void => {
        setTodosData([...todosData].map(item => item.id === currentTodoID ? { ...item, editable: false } : item)); // for remove editable css-class
        setVisibleStatus(false);
    };

    // ref={refEl}
    return (
        <div className="modal" >

            <button className="modal__button modal__button--close" onClick={closeModal}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.11639 7.99994L2.55833 12.558L3.44222 13.4419L8.00027 8.88382L12.5583 13.4419L13.4422 12.558L8.88416 7.99994L13.4422 3.44188L12.5583 2.558L8.00027 7.11605L3.44222 2.558L2.55833 3.44188L7.11639 7.99994Z" fill="" />
                </svg>
            </button>

            <div className="modal__wrapper">

                <form className="modal__form" onSubmit={e => formSubmitHandler(e)}>

                    <fieldset className="modal__inputs">
                        <legend className="modal__title">Title:</legend>
                        <input
                            className="modal__input"
                            type="text"
                            placeholder="Write new task title inside"
                            onChange={e => setInputValue(e.target.value)}
                            required
                        />
                    </fieldset>

                    <div className="modal__radios">
                        <fieldset className="modal__categories">
                            <legend className="modal__title">Category:</legend>

                            <label className="modal__label">
                                <input className="modal__radio" type="radio" name="category" value="groceries" onChange={e => setInputRadioCategoryValue(e.target.value)} />
                                <span className="modal__radio--fake"></span>
                                groceries
                            </label>
                            <label className="modal__label">
                                <input className="modal__radio" type="radio" name="category" value="college" onChange={e => setInputRadioCategoryValue(e.target.value)} />
                                <span className="modal__radio--fake"></span>
                                college
                            </label>
                            <label className="modal__label">
                                <input className="modal__radio" type="radio" name="category" value="payments" onChange={e => setInputRadioCategoryValue(e.target.value)} />
                                <span className="modal__radio--fake"></span>
                                payments
                            </label>
                            <label className="modal__label">
                                <input className="modal__radio" type="radio" name="category" value="" onChange={e => setInputRadioCategoryValue(e.target.value)} />
                                <span className="modal__radio--fake"></span>
                                none
                            </label>
                        </fieldset>

                        <fieldset className="modal__statuses">
                            <legend className="modal__title">Status:</legend>

                            <label className="modal__label">
                                <input className="modal__radio" type="radio" name="status" value="waiting" onChange={e => setInputRadioStatusValue(e.target.value)} />
                                <span className="modal__radio--fake"></span>
                                <span className="modal__label-text waiting">waiting</span>

                            </label>
                            <label className="modal__label">
                                <input className="modal__radio" type="radio" name="status" value="process" onChange={e => setInputRadioStatusValue(e.target.value)} />
                                <span className="modal__radio--fake"></span>
                                <span className="modal__label-text process">process</span>
                            </label>
                            <label className="modal__label">
                                <input className="modal__radio" type="radio" name="status" value="done" onChange={e => setInputRadioStatusValue(e.target.value)} />
                                <span className="modal__radio--fake"></span>
                                <span className="modal__label-text done">done</span>
                            </label>
                            <label className="modal__label">
                                <input className="modal__radio" type="radio" name="status" value="none" onChange={e => setInputRadioStatusValue(e.target.value)} />
                                <span className="modal__radio--fake"></span>
                                <span className="modal__label-text">none</span>
                            </label>
                        </fieldset>
                    </div>

                    <div className="modal__controllers">
                        <button className="modal__button modal__button--save">Ok</button>
                        <button className="modal__button modal__button--cancel" onClick={closeModal}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Modal;