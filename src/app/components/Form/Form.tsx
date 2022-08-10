import React, { useState, useRef } from 'react';

import { Itodo } from '../../types/todoTypes';

import './form.scss';

// /. imports

interface propTypes {
    role: string
    text: string;
    todosData: Itodo[];
    setFilteredTodosData?: (arg: Itodo[]) => void;
    setTodosData?: (arg: Itodo[]) => void;
}

// /. interfaces

const Form: React.FC<propTypes> = ({ role, text, setFilteredTodosData, todosData, setTodosData }) => {

    const [createInputValue, setCreateInputValueValue] = useState<string>('');

    const formRef = useRef<HTMLFormElement>(null!);

    const findTodoItem = (searchInputValue: string): void => {
        setFilteredTodosData && setFilteredTodosData([...todosData].filter(item => RegExp(searchInputValue.trim(), 'gi').test(item.title)));
    };

    const formSubmitHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault();  // disable refresh page afted submit form 

        switch (role) {
            case 'add':
                setTodosData && setTodosData([...todosData, { // create todo item
                    id: +new Date(),
                    title: createInputValue,
                    category: 'Groceries',
                    status: '',
                    completed: false
                }]);

                //  clear input value after create todo item
                formRef.current.reset();
                setCreateInputValueValue('');
                break;
        }

    };

    return (
        <form ref={formRef} className="form" onSubmit={e => formSubmitHandler(e)}>
            {role === 'search' ?
                <input className="form__input" type="text" data-role={role} placeholder={text} onChange={e => findTodoItem(e.target.value)} />
                :
                <input className="form__input" type="text" data-role={role} placeholder={text} onChange={e => setCreateInputValueValue(e.target.value)} />
            }
        </form>
    );
};

export default Form;