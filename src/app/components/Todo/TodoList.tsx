import React from 'react';

import { Itodo } from '../../types/todoTypes';

import TodoTemplate from './TodoTemplate';

import './todo.scss';

// /. imports

interface propTypes {
    todosData: Itodo[];
    setTodosData: (arg: Itodo[]) => void;
    filteredTodosData: Itodo[];
    setVisibleStatus: (arg: boolean) => void
    setCurrentTodoID: (arg: number) => void
}

const TodoList: React.FC<propTypes> = (props) => {

    const {
        todosData,
        setTodosData,
        setVisibleStatus,
        filteredTodosData,
        setCurrentTodoID
    } = props;

    return (
        <ul className="todo">
            {filteredTodosData.map((item: Itodo) => {
                return (
                    <TodoTemplate
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        category={item.category}
                        status={item.status}
                        completed={item.completed}
                        editable={item.editable}
                        todosData={todosData}
                        setTodosData={setTodosData}
                        setVisibleStatus={setVisibleStatus}
                        setCurrentTodoID={setCurrentTodoID}
                    />
                );
            })}
        </ul>
    );
};

export default TodoList;