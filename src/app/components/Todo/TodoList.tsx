import React, { useContext } from 'react';

import { MyContext } from '../Layout/Layout';

import { Itodo } from '../../types/todoTypes';

import TodoTemplate from './TodoTemplate';

import './todo.scss';

// /. imports

interface propTypes {
    setVisibleStatus: (arg: boolean) => void
    setCurrentTodoID: (arg: number) => void
}

const TodoList: React.FC<propTypes> = (props) => {

    const {
        setVisibleStatus,
        setCurrentTodoID
    } = props;

    const {
        todosData,
        setTodosData,
        filteredTodosData
    } = useContext(MyContext);

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