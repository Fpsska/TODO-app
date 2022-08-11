import React from 'react';

import { Itodo } from '../../types/todoTypes';

import Form from '../Form/Form';

import './modal.scss';

// /. imports 

interface propTypes {
    todosData: Itodo[],
    setTodosData: (arg: Itodo[]) => void;
    setModalVisibleStatus: (arg: boolean) => void;
}

// /. interfaces

const Modal: React.FC<propTypes> = ({ todosData, setTodosData, setModalVisibleStatus }) => {
    return (
        <div className="modal">

            <button className="modal__button modal__button--close" onClick={() => setModalVisibleStatus(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.11639 7.99994L2.55833 12.558L3.44222 13.4419L8.00027 8.88382L12.5583 13.4419L13.4422 12.558L8.88416 7.99994L13.4422 3.44188L12.5583 2.558L8.00027 7.11605L3.44222 2.558L2.55833 3.44188L7.11639 7.99994Z" fill="" />
                </svg>
            </button>

            <div className="modal__wrapper">

                <div className="modal__inputs">
                    <h2 className="modal__title">Title:</h2>
                    <Form role={'edit'} text={'Write new task title inside'} todosData={todosData} setTodosData={setTodosData} />
                </div>

                <div className="modal__categories">
                    <h2 className="modal__title">Category:</h2>
                    <form className="modal__form">
                        <label className="modal__label">
                            <input className="modal__radio" type="radio" name="category" value="groceries" />
                            <span className="modal__radio--fake"></span>
                            groceries
                        </label>
                        <label className="modal__label">
                            <input className="modal__radio" type="radio" name="category" value="college" />
                            <span className="modal__radio--fake"></span>
                            college
                        </label>
                        <label className="modal__label">
                            <input className="modal__radio" type="radio" name="category" value="payments" />
                            <span className="modal__radio--fake"></span>
                            payments
                        </label>
                        <label className="modal__label">
                            <input className="modal__radio" type="radio" name="category" value="" />
                            <span className="modal__radio--fake"></span>
                            none
                        </label>
                    </form>
                </div>

                <div className="modal__controllers">
                    <button className="modal__button modal__button--accept">Ok</button>
                    <button className="modal__button modal__button--cancel">Cancel</button>
                </div>

            </div>
        </div>
    );
};

export default Modal;