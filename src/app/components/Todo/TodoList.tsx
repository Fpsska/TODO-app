import React from 'react';

import { Itodo } from '../../types/todoTypes';

import TodoTemplate from './TodoTemplate';

import './todo.scss';

// /. imports

interface propTypes {
    todosData: Itodo[]
}

const TodoList: React.FC<propTypes> = ({ todosData }) => {
    return (
        <ul className="todo">
            {todosData.map((item: Itodo) => {
                return (
                    <TodoTemplate
                        key={item.id}
                        title={item.title}
                        category={item.category}
                        status={item.status}
                    />
                );
            })}
        </ul>
    );
};

export default TodoList;