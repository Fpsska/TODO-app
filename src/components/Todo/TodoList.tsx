import React from 'react';

import { Itodo } from 'types/todoTypes';

import TodoTemplate from './TodoTemplate';

import './todo.scss';

// /. imports

interface propTypes {
    filteredTodosData: Itodo[];
    setModalVisibleStatus: (arg: boolean) => void;
    isFormVisible: boolean;
}

const TodoList: React.FC<propTypes> = props => {
    const { filteredTodosData, setModalVisibleStatus, isFormVisible } = props;

    return (
        <ul className="todo">
            {filteredTodosData.map((item: Itodo) => {
                return (
                    <TodoTemplate
                        key={item.id}
                        {...item}
                        setModalVisibleStatus={setModalVisibleStatus}
                    />
                );
            })}
        </ul>
    );
};

export default TodoList;
