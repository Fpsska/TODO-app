import React, { useState, useEffect } from 'react';

import { Itodo } from '../../types/todoTypes';

import { getRandomArrElement } from '../../helpers/getRandomArrElement';

import Nav from '../Nav/Nav';
import SelectMenu from '../SelectMenu/SelectMenu';
import Form from '../Form/Form';
import TodoList from '../Todo/TodoList';

import './App.css';
import '../../assets/styles/_styles.scss';
import '../../assets/styles/_media.scss';

// /. imports

const App: React.FC = () => {

  const [todosData, setTodosData] = useState<Itodo[]>([]);

  const fetchTodosData = async () => {
    try {
      const limit = 15;
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?&_limit=${limit}`);

      if (!response.ok) {
        throw new Error('response error');
      }

      const data = await response.json();

      data.map((item: any) => { // extend array by category, status fields
        item.category = getRandomArrElement(['Groceries', 'College', 'Payments']);
        item.status = getRandomArrElement(['waiting', 'process', 'done', '']);
      });

      setTodosData(data);

    } catch (err: any) {
      throw new Error(`${err.message || err}`);
    }
  };

  useEffect(() => { // call at initial render
    fetchTodosData();
  }, []);

  return (
    <div className="App">
      <div className="page">
        <div className="page__wrapper">
          <div className="page__nav">
            <SelectMenu />
            <Nav />
          </div>
          <div className="page__content">

            <h1 className="page__title">All Tasks</h1>

            <div className="page__form">
              <Form />
            </div>

            <div className="page__list">
              <TodoList todosData={todosData} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
