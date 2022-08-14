import React, { useState, useRef } from 'react';

import { Itodo } from '../../types/todoTypes';

import './form.scss';

// /. imports

interface propTypes {
    role: string
    text: string;
    todosData: Itodo[];
    setTodosData: (arg: Itodo[]) => void;
    setFilteredTodosData: (arg: Itodo[]) => void;
    isDataTLoading: boolean;
    error: any
}

// /. interfaces

const Form: React.FC<propTypes> = (props) => {

    const {
        role,
        text,
        todosData,
        setTodosData,
        setFilteredTodosData,
        isDataTLoading,
        error
    } = props;

    const [createInputValue, setCreateInputValue] = useState<string>('');

    const formRef = useRef<HTMLFormElement>(null!);

    const findTodoItem = (searchInputValue: string): void => {
        setFilteredTodosData([...todosData].filter(item => RegExp(searchInputValue.trim(), 'gi').test(item.title)));
    };

    const formSubmitHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault();  // disable refresh page after submit form 

        switch (role) {
            case 'add':
                setTodosData([...todosData, { // create todo item
                    id: +new Date(),
                    title: createInputValue,
                    category: '',
                    status: '',
                    completed: false,
                    editable: false
                }]);

                //  clear input value after create todo item
                formRef.current.reset();
                setCreateInputValue('');
                break;
        }
    };

    return (
        <form ref={formRef} className="form" onSubmit={e => !isDataTLoading && !error && formSubmitHandler(e)}>
            {role === 'search' ?
                <input className="form__input"
                    type="text"
                    data-role={role}
                    placeholder={text}
                    onChange={e => findTodoItem(e.target.value)}
                    disabled={isDataTLoading || error} />
                : <input className="form__input"
                    type="text"
                    data-role={role}
                    placeholder={text}
                    onChange={e => setCreateInputValue(e.target.value)}
                    disabled={isDataTLoading || error} />
            }
        </form>
    );
};

export default Form;