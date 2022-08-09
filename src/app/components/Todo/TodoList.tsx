import React from 'react';

import { Itodo } from '../../types/todoTypes';

import TodoTemplate from './TodoTemplate';

import './todo.scss';

// /. imports

interface propTypes {
    todosData: Itodo[];
    setTodosData: (arg: Itodo[]) => void
}

const TodoList: React.FC<propTypes> = ({ todosData, setTodosData }) => {
    return (
        <ul className="todo">
            {todosData.map((item: Itodo) => {
                return (
                    <TodoTemplate
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        category={item.category}
                        status={item.status}
                        todosData={todosData}
                        setTodosData={setTodosData}
                    />
                );
            })}
        </ul>
    );
};

export default TodoList;