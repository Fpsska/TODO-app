import React from 'react';

import { Itodo } from '../../types/todoTypes';

import TodoTemplate from './TodoTemplate';

import './todo.scss';

// /. imports

interface propTypes {
    filteredTodosData: Itodo[];
    setModalVisibleStatus: (arg: boolean) => void;
    isFormVisible: boolean;
    isModalVisible: boolean;
    currentTodoID: number
}

const TodoList: React.FC<propTypes> = (props) => {

    const {
        filteredTodosData,
        setModalVisibleStatus,
        isFormVisible,
        isModalVisible,
        currentTodoID
    } = props;

    return (
        <ul className={isFormVisible ? 'todo minimized' : 'todo'}>
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

                        isModalVisible={isModalVisible}
                        setModalVisibleStatus={setModalVisibleStatus}
                        currentTodoID={currentTodoID}
                    />
                );
            })}
        </ul>
    );
};

export default TodoList;