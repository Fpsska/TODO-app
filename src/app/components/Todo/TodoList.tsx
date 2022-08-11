import React from 'react';

import { Itodo } from '../../types/todoTypes';

import TodoTemplate from './TodoTemplate';

import './todo.scss';

// /. imports

interface propTypes {
    filteredTodosData: Itodo[];
    todosData: Itodo[];
    setTodosData: (arg: Itodo[]) => void;
    setFilteredTodosData: (arg: Itodo[]) => void;
    setModalVisibleStatus: (arg: boolean) => void
}

const TodoList: React.FC<propTypes> = (props) => {

    const {
        filteredTodosData,
        todosData,
        setTodosData,
        setFilteredTodosData,
        setModalVisibleStatus
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
                        filteredTodosData={filteredTodosData}
                        todosData={todosData}
                        setTodosData={setTodosData}
                        setFilteredTodosData={setFilteredTodosData}
                        setModalVisibleStatus={setModalVisibleStatus}
                    />
                );
            })}
        </ul>
    );
};

export default TodoList;