import React, { useState, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';

// import { useLocalStorage } from '../../hooks/useLocalStorage';

import {
    addNewTodosItem,
    findTodosItemByName
} from '../../../store/slices/todoSlice';

import './form.scss';

// /. imports

interface propTypes {
    role: string;
    text: string;
}

// /. interfaces

const Form: React.FC<propTypes> = props => {
    const { role, text } = props;

    const { isTodosDataLoading, error } = useAppSelector(
        state => state.todoSlice
    );

    const [createInputValue, setCreateInputValue] = useState<string>('');

    const formRef = useRef<HTMLFormElement>(null!);

    const dispatch = useAppDispatch();

    const formSubmitHandler = (e: React.FormEvent): void => {
        e.preventDefault(); // disable refresh page after submit form

        switch (role) {
            case 'add':
                createInputValue &&
                    dispatch(
                        addNewTodosItem({
                            id: +new Date(),
                            title: createInputValue,
                            category: '',
                            status: '',
                            completed: false,
                            editable: false
                        })
                    );

                //  clear input value after create todo item
                formRef.current.reset();
                setCreateInputValue('');
                break;
        }
    };

    return (
        <form
            ref={formRef}
            className="form"
            onSubmit={e =>
                !isTodosDataLoading && !error && formSubmitHandler(e)
            }
        >
            {role === 'search' ? (
                <input
                    className="form__input"
                    type="text"
                    data-role={role}
                    placeholder={text}
                    onChange={e =>
                        dispatch(findTodosItemByName({ value: e.target.value }))
                    }
                    disabled={isTodosDataLoading || error}
                />
            ) : (
                <input
                    className="form__input"
                    type="text"
                    data-role={role}
                    placeholder={text}
                    onChange={e => setCreateInputValue(e.target.value)}
                    disabled={isTodosDataLoading || error}
                />
            )}
        </form>
    );
};

export default Form;
