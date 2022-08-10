import React, { useState, useEffect } from 'react';

import { Itodo } from '../../types/todoTypes';

import { getRandomArrElement } from '../../helpers/getRandomArrElement';

import Nav from '../Nav/Nav';
import SelectMenu from '../SelectMenu/SelectMenu';
import Form from '../Form/Form';
import TodoList from '../Todo/TodoList';
import Preloader from '../Preloader/Preloader';
import Burger from '../Burger/Burger';

import './App.css';
import '../../assets/styles/_styles.scss';
import '../../assets/styles/_media.scss';

// /. imports

const App: React.FC = () => {

  const [todosData, setTodosData] = useState<Itodo[]>([]);
  const [filteredTodosData, setFilteredTodosData] = useState<Itodo[]>([]);
  const [isLoading, setLoadingStatus] = useState<boolean>(true);
  const [isDataEmpty, setDataEmtyStatus] = useState<boolean>(true);
  const [isBurgerVisible, setBurgerVisibleStatus] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('All');

  const fetchTodosData = async () => {
    try {
      const limit = 15;
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?&_limit=${limit}`);

      if (!response.ok) {
        throw new Error('response error');
      }

      const data = await response.json();

      data.map((item: Itodo) => { // extend array by category, status fields
        item.category = getRandomArrElement(['Groceries', 'College', 'Payments']);
        item.status = getRandomArrElement(['waiting', 'process', 'done', '']);
      });

      setTodosData(data);

      setTimeout(() => {
        setLoadingStatus(false);
      }, 1600);

    } catch (err: any) {
      setTimeout(() => {
        setLoadingStatus(false);
      }, 1600);

      throw new Error(`${err.message || err}`);
    }
  };

  const openBtnHandler = (e: React.SyntheticEvent): void => {
    e.stopPropagation();  // for correct work of burger hide/show logic
    setBurgerVisibleStatus(true);
  };

  useEffect(() => { // call at initial render
    fetchTodosData();
  }, []);

  useEffect(() => {
    todosData.length === 0 ? setDataEmtyStatus(true) : setDataEmtyStatus(false); // check length of todosData[] for handle display alternative content
    setFilteredTodosData(todosData);
  }, [todosData]);

  useEffect(() => {
    filteredTodosData.length === 0 ? setDataEmtyStatus(true) : setDataEmtyStatus(false);
    console.log('filteredTodosData', filteredTodosData)
  },[filteredTodosData])


  return (
    <div className="App">
      <div className="page">
        <div className="page__wrapper">

          {isBurgerVisible && <Burger isBurgerVisible={isBurgerVisible} setBurgerVisibleStatus={setBurgerVisibleStatus} />}

          <div className="page__nav">
            <SelectMenu />
            <Nav
              todosData={todosData}
              setTodosData={setTodosData}
              filteredTodosData={filteredTodosData}
              setFilteredTodosData={setFilteredTodosData} 
              setTitle={setTitle}
              />
          </div>
          <div className="page__content">

            {!isBurgerVisible &&
              <button className="page__button" onClick={(e) => openBtnHandler(e)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_8368_6965)">
                    <path d="M16.0002 5H0.000244141V4H16.0002V5ZM16.0002 13H0.000244141V12H16.0002V13ZM16.0002 8.99218H0.000244141V8H16.0002V8.99218Z" fill="" />
                  </g>
                  <defs>
                    <clipPath id="clip0_8368_6965">
                      <rect width="16" height="16" fill="white" transform="translate(0.000244141)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            }

            <div className="page__header">
              <h1 className="page__title">{title} Tasks</h1>

              <div className="page__form">
                <Form text={'Find a task'} />
              </div>
            </div>

            <div className="page__list">
              {isLoading ?
                <div className="page__preloader"><Preloader /></div> :
                isDataEmpty ?
                  <h2 className="page__title page__title--empty">no matches</h2> :
                  <TodoList filteredTodosData={filteredTodosData} todosData={todosData} setTodosData={setTodosData} setFilteredTodosData={setFilteredTodosData} />}
            </div>

            <div className="page__footer">
              <Form text={'Add a new task inside'} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
