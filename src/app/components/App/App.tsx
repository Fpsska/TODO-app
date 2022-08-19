import React, { useState, useEffect, useContext } from 'react';

import { Inav } from '../../types/navTypes';
import { Icategory } from '../../types/categoryTypes';
import { Iselect } from '../../types/selectTypes';

import { MyContext } from '../Layout/Layout';

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
    setTodosData,
    filteredTodosData,
    setFilteredTodosData,
    isDataTLoading,
    error,
    title,
    setTitle
  } = useContext(MyContext);

  const [isDataEmpty, setDataEmptyStatus] = useState<boolean>(true);

  const [isBurgerVisible, setBurgerVisibleStatus] = useState<boolean>(false);
  const [isFormVisible, setFormVisibleStatus] = useState<boolean>(false);

  const [isEditable, setEditableStatus] = useState<boolean>(false);
  const [inputTitleValue, setInputTitleValue] = useState<string>(title);

  const [navTemplatesData, setNavTemplatesData] = useState<Inav[]>([
    {
      id: 1,
      text: 'All',
      category: 'all',
      link: '#',
      isActive: true
    },
    {
      id: 2,
      text: 'Groceries',
      category: 'groceries',
      link: '#',
      isActive: false
    },
    {
      id: 4,
      text: 'College',
      category: 'college',
      link: '#',
      isActive: false
    },
    {
      id: 5,
      text: 'Payments',
      category: 'payments',
      link: '#',
      isActive: false
    }
  ]);
  const [categoryTemplatesData, setCategoryTemplatesData] = useState<Icategory[]>([
    {
      id: 1,
      name: 'category',
      text: 'groceries',
      value: 'groceries'
    },
    {
      id: 2,
      name: 'category',
      text: 'college',
      value: 'college'
    },
    {
      id: 3,
      name: 'category',
      text: 'payments',
      value: 'payments'
    },
    {
      id: 4,
      name: 'category',
      text: 'none',
      value: ''
    }
  ]);
  const [selectTemplatesData, setSelectTemplatesData] = useState<Iselect[]>([
    {
      id: 1,
      text: 'All',
      value: 'all'
    },
    {
      id: 2,
      text: 'Groceries',
      value: 'groceries'
    },
    {
      id: 3,
      text: 'College',
      value: 'college'
    },
    {
      id: 4,
      text: 'Payments',
      value: 'payments'
    }
  ]);

  const [currentTodoID, setCurrentTodoID] = useState<number>(todosData[0]?.id);
  const [currentNavID, setCurrentNavID] = useState<number>(navTemplatesData[0]?.id);
  const [currentCategoryID, setCurrentCategoryID] = useState<number>(categoryTemplatesData[0]?.id);


  const { refEl, isVisible, setVisibleStatus } = useAreaHandler({ initialStatus: false });


  useEffect(() => {
    todosData.length === 0 ? setDataEmptyStatus(true) : setDataEmptyStatus(false); // check length of todosData[] for handle display alternative content
    // console.log('todosData', todosData)
  }, [todosData]);

  useEffect(() => {
    filteredTodosData.length === 0 ? setDataEmptyStatus(true) : setDataEmptyStatus(false);
    // console.log('!!! filteredTodosData', filteredTodosData)
  }, [filteredTodosData]);

  useEffect(() => { // remove editable css-class when modal is hidden
    !isVisible && setTodosData([...todosData].map(item => item.id === currentTodoID ? { ...item, editable: false } : item));
  }, [isVisible]);

  useEffect(() => { // update title value
    setInputTitleValue(title);
  }, [title]);


  const openBurger = (e: React.SyntheticEvent): void => {
    e.stopPropagation();  // for correct work of burger hide/show logic
    setBurgerVisibleStatus(true);
  };

  const editCategoryName = (): void => {
    setEditableStatus(!isEditable);



  };

  return (
    <div className="App">
      <div className="page">

        <div className="page__wrapper">

          <div className="page__burger" ref={refEl}>
            <Burger
              isBurgerVisible={isBurgerVisible}
              setBurgerVisibleStatus={setBurgerVisibleStatus}
            />
          </div>

          <div className="page__modal" ref={refEl}>
            {isVisible &&
              <Modal
                todosData={todosData}
                setTodosData={setTodosData}
                setVisibleStatus={setVisibleStatus}
                currentTodoID={currentTodoID}

                categoryTemplatesData={categoryTemplatesData}
              />
            }
          </div>

          <div className="page__nav">
            <div className="page__nav-select">
              <SelectMenu
                todosData={todosData}
                setFilteredTodosData={setFilteredTodosData}
                setTitle={setTitle}
                isDataTLoading={isDataTLoading}
                error={error}
                selectTemplatesData={selectTemplatesData}
              />
            </div>
            <Nav
              navTemplatesData={navTemplatesData}
              setNavTemplatesData={setNavTemplatesData}
              setCurrentNavID={setCurrentNavID}
              setCurrentCategoryID={setCurrentCategoryID}
              setEditableStatus={setEditableStatus}
            />
            <div className="page__category-form">
              <CategoryForm
                navTemplatesData={navTemplatesData}
                setNavTemplatesData={setNavTemplatesData}
                categoryTemplatesData={categoryTemplatesData}
                setCategoryTemplatesData={setCategoryTemplatesData}
                selectTemplatesData={selectTemplatesData}
                setSelectTemplatesData={setSelectTemplatesData}
                isFormVisible={isFormVisible}
                setFormVisibleStatus={setFormVisibleStatus}
              />
            </div>
          </div>

          <div className="page__content">

            {!isBurgerVisible &&
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
                isEditable={isEditable}
                inputTitleValue={inputTitleValue}
                setInputTitleValue={setInputTitleValue}
                navTemplatesData={navTemplatesData}
                setNavTemplatesData={setNavTemplatesData}
                currentNavID={currentNavID}
                todosData={todosData}
                setTodosData={setTodosData}
                setEditableStatus={setEditableStatus}
                categoryTemplatesData={categoryTemplatesData}
                setCategoryTemplatesData={setCategoryTemplatesData}
                currentCategoryID={currentCategoryID}
              />

              <>
                {inputTitleValue !== 'All' &&
                  <button className="page__button page__button--edit" onClick={editCategoryName}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.23 1H11.77L3.52002 9.25L3.35999 9.46997L1 13.59L2.41003 15L6.53003 12.64L6.75 12.48L15 4.22998V2.77002L13.23 1ZM2.41003 13.59L3.92004 10.59L5.37 12.04L2.41003 13.59ZM6.23999 11.53L4.46997 9.76001L12.47 1.76001L14.24 3.53003L6.23999 11.53Z" fill="#C5C5C5" />
                    </svg>
                  </button>}
              </>

              <Form
                role={'search'}
                text={'Find a task'}
                todosData={todosData}
                setTodosData={setTodosData}
                setFilteredTodosData={setFilteredTodosData}
                isDataTLoading={isDataTLoading}
                error={error}
              />
            </div>

            <div className="page__list">
              {isDataTLoading ?
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
                      todosData={todosData}
                      setTodosData={setTodosData}
                      filteredTodosData={filteredTodosData}
                      setVisibleStatus={setVisibleStatus}
                      setCurrentTodoID={setCurrentTodoID}

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
                isDataTLoading={isDataTLoading}
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
