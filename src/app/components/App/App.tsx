import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { setInputTitleValue } from '../../../store/slices/todoSlice';

import { setTodosData, setFilteredTodosData } from '../../../store/slices/todoSlice';

import { useAreaHandler } from '../../hooks/useAreaHandler';

import Nav from '../Nav/Nav';
import SelectMenu from '../SelectMenu/SelectMenu';
import Form from '../Form/Form';
import TodoList from '../Todo/TodoList';
import Preloader from '../Preloader/Preloader';
import Burger from '../Burger/Burger';
import Modal from '../Modal/Modal';
import CategoryForm from '../CategoryForm/CategoryForm';
import TitleForm from '../TitleForm/TitleForm';

import '../../assets/styles/_styles.scss';
import '../../assets/styles/_media.scss';
import './App.css';


// /. imports


const App: React.FC = () => {

  const {
    todosData,
    filteredTodosData,
    currentTodoID,
    isTodosDataLoading,
    isFormVisible,
    error,
    title,
    inputTitleValue
  } = useAppSelector(state => state.todoSlice);

  const {
    navTemplatesData,
    selectTemplatesData,
    currentNavID,
    currentNavSelectID
  } = useAppSelector(state => state.navSlice);

  const dispatch = useAppDispatch();

  const [isDataEmpty, setDataEmptyStatus] = useState<boolean>(true);

  // /. state

  const modalHandler = useAreaHandler({ initialStatus: false });
  const burgerHandler = useAreaHandler({ initialStatus: false });
  const titleFormHandler = useAreaHandler({ initialStatus: false });

  // /. hooks 

  useEffect(() => {
    todosData.length === 0 ? setDataEmptyStatus(true) : setDataEmptyStatus(false); // check length of todosData[] for handle display alternative content
    // console.log('todosData', todosData)
  }, [todosData]);

  useEffect(() => {
    filteredTodosData.length === 0 ? setDataEmptyStatus(true) : setDataEmptyStatus(false);
    // console.log('!!! filteredTodosData', filteredTodosData)
  }, [filteredTodosData]);

  useEffect(() => { // remove editable css-class when modal is hidden
    !modalHandler.isVisible && setTodosData([...todosData].map(item => item.id === currentTodoID ? { ...item, editable: false } : item));
  }, [modalHandler.isVisible]);

  useEffect(() => { // update setInputTitleValue 
    dispatch(setInputTitleValue({title: title}));
  }, [title]);


  const openBurger = (e: React.SyntheticEvent): void => {
    e.stopPropagation();  // for correct work of burger hide/show logic
    burgerHandler.setVisibleStatus(true);
  };

  const editCategoryName = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
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

          <div className="page__nav">
            <div className="page__nav-select">
              <SelectMenu
                selectTemplatesData={selectTemplatesData}
                currentTodoID={currentTodoID}
                isDataTLoading={isTodosDataLoading}
                error={error}
              />
            </div>
            <Nav
              navTemplatesData={navTemplatesData}
              setEditableStatus={titleFormHandler.setVisibleStatus}
            />
            <div className="page__category-form">
              <CategoryForm />
            </div>
          </div>

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
                todosData={todosData}
                navTemplatesData={navTemplatesData}
                selectTemplatesData={selectTemplatesData}
                currentNavID={currentNavID}
                currentNavSelectID={currentNavSelectID}
              />

              <>
                {inputTitleValue !== 'All' &&
                  <button className="page__button page__button--edit" onClick={e => editCategoryName(e)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.23 1H11.77L3.52002 9.25L3.35999 9.46997L1 13.59L2.41003 15L6.53003 12.64L6.75 12.48L15 4.22998V2.77002L13.23 1ZM2.41003 13.59L3.92004 10.59L5.37 12.04L2.41003 13.59ZM6.23999 11.53L4.46997 9.76001L12.47 1.76001L14.24 3.53003L6.23999 11.53Z" fill="#C5C5C5" />
                    </svg>
                  </button>
                }
              </>

              <Form
                role={'search'}
                text={'Find a task'}
                todosData={todosData}
                setTodosData={setTodosData}
                setFilteredTodosData={setFilteredTodosData}
                isDataTLoading={isTodosDataLoading}
                error={error}
              />
            </div>

            <div className="page__list">
              {isTodosDataLoading ?
                <div className="page__preloader"><Preloader /></div> :
                error ?
                  <h2 className="page__message">Error: {error}</h2> :
                  isDataEmpty ?
                    <>
                      {
                        title === 'All' ?
                          <h2 className="page__message">Task list is empty</h2>
                          :
                          <h2 className="page__message">{title} task list is empty</h2>
                      }
                    </>
                    :
                    <TodoList
                      filteredTodosData={filteredTodosData}
                      setVisibleStatus={modalHandler.setVisibleStatus}
                      isFormVisible={isFormVisible}
                    />
              }
            </div>

            <div className="page__footer">
              <Form
                role={'add'}
                text={'Add a new task inside'}
                todosData={todosData}
                setTodosData={setTodosData}
                setFilteredTodosData={setFilteredTodosData}
                isDataTLoading={isTodosDataLoading}
                error={error}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
