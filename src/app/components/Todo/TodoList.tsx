import React from 'react';

import { Itodo } from '../../types/todoTypes';

import TodoTemplate from './TodoTemplate';

import './todo.scss';

// /. imports

interface propTypes {
    todosData: Itodo[];
    setVisibleStatus: (arg: boolean) => void;
    isFormVisible: boolean
}

const TodoList: React.FC<propTypes> = (props) => {

    const {
        todosData,
        setVisibleStatus,
        isFormVisible
    } = props;

    return (
        <ul className={isFormVisible ? 'todo minimized' : 'todo'}>
            {todosData.map((item: Itodo) => {
                return (
                    <TodoTemplate
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        category={item.category}
                        status={item.status}
                        completed={item.completed}
                        editable={item.editable}

                        setVisibleStatus={setVisibleStatus}
                    />
                );
            })}
        </ul>
    );
};

export default TodoList;