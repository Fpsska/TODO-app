import React, { useState } from 'react';

import { Itodo } from '../../types/todoTypes';

import TodoTemplate from './TodoTemplate';

import './todo.scss';

// /. imports

const TodoList: React.FC = () => {

    const [todoData] = useState<Itodo[]>([
        {
            id: '1',
            text: 'Get a new helmet',
            category: 'Uncategorized',
            status: 'waiting'
        },
        {
            id: '2',
            text: 'Purchase Milk & Corn Flakes',
            category: 'Groceries',
            status: 'process'
        },
        {
            id: '3',
            text: 'Pay mortgage',
            category: 'Payments',
            status: 'done'
        },
        {
            id: '4',
            text: 'Complete Assignments',
            category: 'College',
            status: 'process'
        },
        {
            id: '5',
            text: 'Make a coffee',
            category: 'Uncategorized',
            status: ''
        }
    ]);

    return (
        <ul className="todo">
            {todoData.map((item: Itodo) => {
                return (
                    <TodoTemplate
                        key={item.id}
                        text={item.text}
                        category={item.category}
                        status={item.status}
                    />
                );
            })}
        </ul>
    );
};

export default TodoList;