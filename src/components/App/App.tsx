import React, { useState, useEffect } from 'react';

import { useAreaHandler } from 'utils/hooks/useAreaHandler';
import { filterDataByProperty } from 'utils/helpers/filterDataByProperty';

import {
    switchTodosDataEmptyStatus,
    setTitle,
    findTodosItemByName,
    addNewTodosItem
} from 'app/slices/todoSlice';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { Itodo } from 'types/todoTypes';

import NavLayout from '../Nav/NavLayout';
import TodoForm from '../TodoForm/TodoForm';
import Burger from '../Burger/Burger';
import TitleForm from '../TitleForm/TitleForm';
import PageList from '../PageList/PageList';

import 'assets/styles/_styles.scss';
import 'assets/styles/_media.scss';
import './App.css';

// /. imports

const App: React.FC = () => {
    const {
        todosData,
        categoryTemplatesData,
        filterCompareValue,
        inputTitleValue
    } = useAppSelector(state => state.todoSlice);

    const { navTemplatesData, selectTemplatesData } = useAppSelector(
        state => state.navSlice
    );

    const dispatch = useAppDispatch();

    const burgerAreaHandler = useAreaHandler({ initialStatus: false });
    const titleFormAreaHandler = useAreaHandler({ initialStatus: false });

    // /. hooks usage

    const [filteredTodosData, setFilteredTodosData] =
        useState<Itodo[]>(todosData);

    useEffect(() => {
        // update todosData[] when filering by filterCompareValue
        setFilteredTodosData(
            filterDataByProperty(todosData, 'category', filterCompareValue)
        );

        // update todosDataFromStorage value
        localStorage.setItem('todosDataFromStorage', JSON.stringify(todosData));
    }, [todosData, filterCompareValue]);

    useEffect(() => {
        // check length of filteredTodosData[] for handle display alternative content
        filteredTodosData.length === 0
            ? dispatch(switchTodosDataEmptyStatus({ status: true }))
            : dispatch(switchTodosDataEmptyStatus({ status: false }));
    }, [filteredTodosData, filterCompareValue]);

    useEffect(() => {
        // update page__message text content
        dispatch(setTitle({ title: inputTitleValue }));
    }, [inputTitleValue]);

    const openBurger = (e: React.SyntheticEvent): void => {
        e.stopPropagation(); // for correct work of burger hide/show logic
        burgerAreaHandler.setVisibleStatus(true);
    };

    const editCategoryName = (): void => {
        titleFormAreaHandler.setVisibleStatus(!titleFormAreaHandler.isVisible);
    };

    const onSearchInputChange = (value: string): void => {
        dispatch(findTodosItemByName({ value }));
    };

    const onCreateInputChange = (value: string): void => {
        dispatch(
            addNewTodosItem({
                id: +new Date(),
                title: value,
                category: '',
                status: '',
                completed: false,
                editable: false
            })
        );
    };

    return (
        <div className="App">
            <div className="page">
                <div className="page__wrapper">
                    <NavLayout
                        setEditableStatus={
                            titleFormAreaHandler.setVisibleStatus
                        }
                    />

                    <main className="main">
                        <div
                            className="page__burger"
                            ref={burgerAreaHandler.refEl}
                        >
                            <Burger
                                isVisible={burgerAreaHandler.isVisible}
                                setVisibleStatus={
                                    burgerAreaHandler.setVisibleStatus
                                }
                            />
                        </div>

                        <section className="page__content">
                            {!burgerAreaHandler.isVisible && (
                                <button
                                    className="page__button page__button--burger"
                                    aria-label="open burger menu"
                                    onClick={e => openBurger(e)}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_8368_6965)">
                                            <path
                                                d="M16.0002 5H0.000244141V4H16.0002V5ZM16.0002 13H0.000244141V12H16.0002V13ZM16.0002 8.99218H0.000244141V8H16.0002V8.99218Z"
                                                fill=""
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_8368_6965">
                                                <rect
                                                    width="16"
                                                    height="16"
                                                    fill="white"
                                                    transform="translate(0.000244141)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            )}

                            <div className="page__header">
                                <TitleForm
                                    refEl={titleFormAreaHandler.refEl}
                                    isEditable={titleFormAreaHandler.isVisible}
                                    setEditableStatus={
                                        titleFormAreaHandler.setVisibleStatus
                                    }
                                    inputTitleValue={inputTitleValue}
                                    filterCompareValue={filterCompareValue}
                                    navTemplatesData={navTemplatesData}
                                    selectTemplatesData={selectTemplatesData}
                                    categoryTemplatesData={
                                        categoryTemplatesData
                                    }
                                />
                                <>
                                    {inputTitleValue !== 'All' && (
                                        <button
                                            className="page__button page__button--edit"
                                            aria-label="edit todo title group"
                                            onClick={editCategoryName}
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M13.23 1H11.77L3.52002 9.25L3.35999 9.46997L1 13.59L2.41003 15L6.53003 12.64L6.75 12.48L15 4.22998V2.77002L13.23 1ZM2.41003 13.59L3.92004 10.59L5.37 12.04L2.41003 13.59ZM6.23999 11.53L4.46997 9.76001L12.47 1.76001L14.24 3.53003L6.23999 11.53Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </>
                                <TodoForm
                                    role="search"
                                    inputPlaceholder="Find a task"
                                    onInputChangeEvent={onSearchInputChange}
                                />
                            </div>

                            <PageList />

                            <div className="page__footer">
                                <TodoForm
                                    role="add"
                                    inputPlaceholder="Add a new task inside"
                                    onInputChangeEvent={onCreateInputChange}
                                />
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
