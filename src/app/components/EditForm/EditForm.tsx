import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import {
    editCurrentTodosDataItem,
    switchTodosItemEditableStatus
} from '../../../store/slices/todoSlice';

import { getCurrentArrItem } from '../../helpers/getCurrentArrItem';

import './edit-form.scss';

// /. imports

interface propTypes {
    setModalVisibleStatus: (arg: boolean) => void;
}

const EditForm: React.FC<propTypes> = ({ setModalVisibleStatus }) => {
    const { categoryTemplatesData, todosData, currentTodoID } = useAppSelector(
        state => state.todoSlice
    );

    const { navTemplatesData, selectTemplatesData } = useAppSelector(
        state => state.navSlice
    );

    const [inputValue, setInputValue] = useState<string>('');
    const [inputRadioCategoryValue, setInputRadioCategoryValue] =
        useState<string>('');
    const [inputRadioStatusValue, setInputRadioStatusValue] =
        useState<string>('');

    const dispatch = useAppDispatch();

    const formSubmitHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault();

        dispatch(
            editCurrentTodosDataItem({
                id: currentTodoID,
                title: inputValue,
                category: !inputRadioCategoryValue
                    ? ''
                    : inputRadioCategoryValue.toLowerCase(),
                status: inputRadioStatusValue
            })
        );

        setModalVisibleStatus(false);
    };

    const cancelForm = (): void => {
        dispatch(
            switchTodosItemEditableStatus({
                id: currentTodoID,
                status: false
            })
        );
        setModalVisibleStatus(false);
    };

    useEffect(() => {
        console.log(inputRadioCategoryValue);
    }, [inputRadioCategoryValue]);

    useEffect(() => {
        // display, save initial todo item properties if changes is not accepted/not did
        setInputValue(getCurrentArrItem(todosData, 'id', currentTodoID)?.title);
        setInputRadioCategoryValue(
            getCurrentArrItem(todosData, 'id', currentTodoID)?.category
        );
        setInputRadioStatusValue(
            getCurrentArrItem(todosData, 'id', currentTodoID)?.status
        );
    }, [currentTodoID]);

    useEffect(() => {
        // update categoryDataFromStorage value
        localStorage.setItem(
            'categoryDataFromStorage',
            JSON.stringify(categoryTemplatesData)
        );
    }, [categoryTemplatesData, navTemplatesData, selectTemplatesData]);

    return (
        <form
            className="edit-form"
            onSubmit={e => inputValue && formSubmitHandler(e)}
            action="#"
        >
            <fieldset className="edit-form__inputs">
                <legend className="edit-form__title">Title:</legend>
                <input
                    className="edit-form__input"
                    type="text"
                    placeholder="Write new task title inside"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    required
                />
            </fieldset>

            <div className="edit-form__radios">
                <fieldset className="edit-form__categories">
                    <legend className="edit-form__title">Category:</legend>

                    <>
                        {categoryTemplatesData.map(item => {
                            return (
                                <label
                                    className="edit-form__label"
                                    key={item.id}
                                >
                                    <input
                                        className="edit-form__radio"
                                        type="radio"
                                        name={item.name}
                                        value={item.value}
                                        onChange={e =>
                                            setInputRadioCategoryValue(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <span className="edit-form__radio--fake"></span>
                                    <span
                                        className="edit-form__radio--text"
                                        title={item.text}
                                    >
                                        {item.text}
                                    </span>
                                </label>
                            );
                        })}
                    </>
                </fieldset>

                <fieldset className="edit-form__statuses">
                    <legend className="edit-form__title">Status:</legend>

                    <label className="edit-form__label">
                        <input
                            className="edit-form__radio"
                            type="radio"
                            name="status"
                            value="waiting"
                            onChange={e =>
                                setInputRadioStatusValue(e.target.value)
                            }
                        />
                        <span className="edit-form__radio--fake"></span>
                        <span className="edit-form__label-text waiting">
                            waiting
                        </span>
                    </label>
                    <label className="edit-form__label">
                        <input
                            className="edit-form__radio"
                            type="radio"
                            name="status"
                            value="process"
                            onChange={e =>
                                setInputRadioStatusValue(e.target.value)
                            }
                        />
                        <span className="edit-form__radio--fake"></span>
                        <span className="edit-form__label-text process">
                            process
                        </span>
                    </label>
                    <label className="edit-form__label">
                        <input
                            className="edit-form__radio"
                            type="radio"
                            name="status"
                            value="done"
                            onChange={e =>
                                setInputRadioStatusValue(e.target.value)
                            }
                        />
                        <span className="edit-form__radio--fake"></span>
                        <span className="edit-form__label-text done">done</span>
                    </label>
                    <label className="edit-form__label">
                        <input
                            className="edit-form__radio"
                            type="radio"
                            name="status"
                            value="none"
                            onChange={e =>
                                setInputRadioStatusValue(e.target.value)
                            }
                        />
                        <span className="edit-form__radio--fake"></span>
                        <span className="edit-form__label-text">none</span>
                    </label>
                </fieldset>
            </div>

            <div className="edit-form__controllers">
                <button className="edit-form__button edit-form__button--save">
                    Ok
                </button>
                <button
                    className="edit-form__button edit-form__button--cancel"
                    onClick={cancelForm}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditForm;
