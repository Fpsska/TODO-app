import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import {
    editCurrentTodosDataItem,
    switchTodosItemEditableStatus
} from 'app/slices/todoSlice';

import CustomRadioInput from 'components/CustomRadioInput/CustomRadioInput';

import { Icategory } from 'types/categoryTypes';
import { Istatus } from 'types/statusTypes';

import './edit-form.scss';

// /. imports

interface propTypes {
    setModalVisibleStatus: (arg: boolean) => void;
}

// /. interfaces

const EditForm: React.FC<propTypes> = ({ setModalVisibleStatus }) => {
    const {
        categoryTemplatesData,
        todosData,
        statusTemplatesData,
        currentTodoID
    } = useAppSelector(state => state.todoSlice);

    const [inputValue, setInputValue] = useState<string>('');
    const [inputRadioCategoryValue, setInputRadioCategoryValue] =
        useState<string>('');
    const [inputRadioStatusValue, setInputRadioStatusValue] =
        useState<string>('');

    const dispatch = useAppDispatch();

    const formSubmitHandler = (): void => {
        dispatch(
            editCurrentTodosDataItem({
                id: currentTodoID,
                title: inputValue,
                category: inputRadioCategoryValue.toLowerCase(),
                status: inputRadioStatusValue
            })
        );

        setModalVisibleStatus(false);
    };

    const onButtonCancelClick = (): void => {
        dispatch(
            switchTodosItemEditableStatus({
                id: currentTodoID,
                status: false
            })
        );
        setModalVisibleStatus(false);
    };

    useEffect(() => {
        // display initial todo item properties if changes is not applied
        const targetTodo = todosData.find(item => item.id === currentTodoID);

        if (targetTodo) {
            setInputValue(targetTodo.title);
            setInputRadioCategoryValue(targetTodo.category);
            setInputRadioStatusValue(targetTodo.status);
        }
    }, [todosData, currentTodoID]);

    useEffect(() => {
        // update categoryDataFromStorage value
        localStorage.setItem(
            'categoryDataFromStorage',
            JSON.stringify(categoryTemplatesData)
        );
    }, [categoryTemplatesData]);

    return (
        <form
            className="edit-form"
            onSubmit={e => e.preventDefault()}
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
                        {categoryTemplatesData.map((item: Icategory) => {
                            return (
                                <CustomRadioInput
                                    key={item.id}
                                    {...item}
                                    inputRadioValue={inputRadioCategoryValue}
                                    onInputChangeEvent={
                                        setInputRadioCategoryValue
                                    }
                                />
                            );
                        })}
                    </>
                </fieldset>

                <fieldset className="edit-form__statuses">
                    <legend className="edit-form__title">Status:</legend>
                    <>
                        {statusTemplatesData.map((item: Istatus) => {
                            return (
                                <CustomRadioInput
                                    key={item.id}
                                    {...item}
                                    inputRadioValue={inputRadioStatusValue}
                                    onInputChangeEvent={
                                        setInputRadioStatusValue
                                    }
                                />
                            );
                        })}
                    </>
                </fieldset>
            </div>

            <div className="edit-form__controllers">
                <button
                    className="edit-form__button edit-form__button--save"
                    type="button"
                    onClick={formSubmitHandler}
                >
                    Ok
                </button>
                <button
                    className="edit-form__button edit-form__button--cancel"
                    type="button"
                    onClick={onButtonCancelClick}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditForm;
