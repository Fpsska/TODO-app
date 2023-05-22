import React, { useState, useRef } from 'react';

import { useAppSelector } from 'app/hooks';

import './todo-form.scss';

// /. imports

interface propTypes {
    role: string;
    inputPlaceholder: string;
    onInputChangeEvent: (arg: string) => void;
}

// /. interfaces

const TodoForm: React.FC<propTypes> = props => {
    const { role, inputPlaceholder, onInputChangeEvent } = props;

    const { isTodosDataLoading, error } = useAppSelector(
        state => state.todoSlice
    );

    const [inputValue, setInputValue] = useState<string>('');

    const formRef = useRef<HTMLFormElement>(null!);

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); // disable refresh page after submit form

        if (isTodosDataLoading || error || role === 'search') return;

        onInputChangeEvent(inputValue);

        //  clear input value after create todo item
        formRef.current.reset();
        setInputValue('');
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);

        if (role === 'add') return;

        onInputChangeEvent(e.target.value);
    };

    return (
        <form
            ref={formRef}
            className="form"
            onSubmit={e => formSubmitHandler(e)}
            action="#"
        >
            <input
                className="form__input"
                type="text"
                placeholder={inputPlaceholder}
                disabled={isTodosDataLoading || error}
                value={inputValue}
                onChange={e => onInputChange(e)}
            />
        </form>
    );
};

export default TodoForm;
