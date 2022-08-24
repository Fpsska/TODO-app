import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { setInputTitleValue } from '../../../store/slices/todoSlice';

import {
  switchTodosItemEditableStatus,
  switchTodosDataEmptyStatus,
  setCurrentTodosCount
} from '../../../store/slices/todoSlice';

import { useAreaHandler } from '../../hooks/useAreaHandler';
import { filter } from '../../helpers/filter';

import { Itodo } from '../../types/todoTypes';


import NavLayout from '../NavLayout.tsx/NavLayout';
import Form from '../Form/Form';
import TodoList from '../Todo/TodoList';
import Preloader from '../Preloader/Preloader';
import Burger from '../Burger/Burger';
import Modal from '../Modal/Modal';
import TitleForm from '../TitleForm/TitleForm';

import '../../assets/styles/_styles.scss';
import '../../assets/styles/_media.scss';
import './App.css';


// /. imports


const App: React.FC = () => {

  const {
    todosData,
    filterProp,
    currentTodoID,
    currentCategoryID,
    isTodosDataLoading,
    isFormVisible,
    isTodosDataEmpty,
    inputTitleValue,
    title,
    error
  } = useAppSelector(state => state.todoSlice);

  const {
    navTemplatesData,
    selectTemplatesData,
    currentNavID,
    currentNavSelectID
  } = useAppSelector(state => state.navSlice);

  const dispatch = useAppDispatch();

  const modalHandler = useAreaHandler({ initialStatus: false });
  const burgerHandler = useAreaHandler({ initialStatus: false });
  const titleFormHandler = useAreaHandler({ initialStatus: false });

  // /. hooks usage

  const [filteredTodosData, setFilteredTodosData] = useState<Itodo[]>(todosData);

  useEffect(() => { // remove editable css-class when modal is hidden
    !modalHandler.isVisible && dispatch(switchTodosItemEditableStatus({ id: currentTodoID, status: false }));
  }, [modalHandler.isVisible]);

  useEffect(() => { // update todosData when filering by filterProp (category)
    setFilteredTodosData(filter(todosData, filterProp));
  }, [todosData, filterProp]);

  useEffect(() => { // check length of filteredTodosData[] for handle display alternative content
    filteredTodosData.length === 0
      ? dispatch(switchTodosDataEmptyStatus({ status: true }))
      : dispatch(switchTodosDataEmptyStatus({ status: false }));
  }, [filteredTodosData, filterProp])


  const openBurger = (e: React.SyntheticEvent): void => {
    e.stopPropagation();  // for correct work of burger hide/show logic
    burgerHandler.setVisibleStatus(true);
  };

  const editCategoryName = (): void => {
    titleFormHandler.setVisibleStatus(!titleFormHandler.isVisible);
  };

  return (
    <div className="App">
      <div className="page">

        <div className="page__wrapper">

          <div className="page__burger" ref={burgerHandler.refEl}>
            <Burger
              isVisible={burgerHandler.isVisible}
              setVisibleStatus={burgerHandler.setVisibleStatus}
            />
          </div>

          <div className="page__modal" ref={modalHandler.refEl}>
            {modalHandler.isVisible &&
              <Modal
                setVisibleStatus={modalHandler.setVisibleStatus}
              />
            }
          </div>

          <NavLayout
            setEditableStatus={titleFormHandler.setVisibleStatus}
          />

          <div className="page__content">

            {!burgerHandler.isVisible &&
              <button className="page__button page__button--burger" onClick={(e) => openBurger(e)}>
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
              <TitleForm
                refEl={titleFormHandler.refEl}
                isEditable={titleFormHandler.isVisible}
                setEditableStatus={titleFormHandler.setVisibleStatus}
                inputTitleValue={inputTitleValue}
                currentNavID={currentNavID}
                currentNavSelectID={currentNavSelectID}
                currentCategoryID={currentCategoryID}
                filterProp={filterProp}
                navTemplatesData={navTemplatesData}
                selectTemplatesData={selectTemplatesData}
              />
              <>
                {inputTitleValue !== 'All' &&
                  <button className="page__button page__button--edit" onClick={editCategoryName}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.23 1H11.77L3.52002 9.25L3.35999 9.46997L1 13.59L2.41003 15L6.53003 12.64L6.75 12.48L15 4.22998V2.77002L13.23 1ZM2.41003 13.59L3.92004 10.59L5.37 12.04L2.41003 13.59ZM6.23999 11.53L4.46997 9.76001L12.47 1.76001L14.24 3.53003L6.23999 11.53Z" fill="" />
                    </svg>
                  </button>
                }
              </>
              <Form
                role={'search'}
                text={'Find a task'}
              />
            </div>

            <div className="page__list">
              {isTodosDataLoading ?
                <div className="page__preloader"><Preloader /></div> :
                error
                  ?
                  <h2 className="page__message">
                    <span>Error: {error}, trying to launch without data.</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"><g fill="#61DAFB"><path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" /><circle cx="420.9" cy="296.5" r="45.7" /><path d="M520.5 78.1z" /></g></svg>
                  </h2> :
                  isTodosDataEmpty ?
                    <>
                      {
                        title === 'All' ?
                          <h1 className="page__message">Task list is empty</h1>
                          :
                          <h1 className="page__message">{title} task list is empty</h1>
                      }
                    </>
                    :
                    <TodoList
                      filteredTodosData={filteredTodosData}
                      setModalVisibleStatus={modalHandler.setVisibleStatus}
                      isModalVisible={modalHandler.isVisible}
                      isFormVisible={isFormVisible}
                      currentTodoID={currentTodoID}
                    />
              }
            </div>

            <div className="page__footer">
              <Form
                role={'add'}
                text={'Add a new task inside'}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
