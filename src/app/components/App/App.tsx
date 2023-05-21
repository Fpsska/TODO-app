import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import {
    switchTodosDataEmptyStatus,
    setTitle
} from '../../../store/slices/todoSlice';

import { useAreaHandler } from '../../hooks/useAreaHandler';
import { filterDataByCategory } from '../../helpers/filterDataByCategory';

import { Itodo } from '../../types/todoTypes';

import NavLayout from '../Nav/NavLayout';
import Form from '../Form/Form';
import Burger from '../Burger/Burger';
import TitleForm from '../TitleForm/TitleForm';
import PageList from '../PageList/PageList';

import '../../assets/styles/_styles.scss';
import '../../assets/styles/_media.scss';
import './App.css';

// /. imports

const App: React.FC = () => {
    const { todosData, categoryTemplatesData, filterProp, inputTitleValue } =
        useAppSelector(state => state.todoSlice);

    const { navTemplatesData, selectTemplatesData } = useAppSelector(
        state => state.navSlice
    );

    const dispatch = useAppDispatch();

    const burgerHandler = useAreaHandler({ initialStatus: false });
    const titleFormHandler = useAreaHandler({ initialStatus: false });

    // /. hooks usage

    const [filteredTodosData, setFilteredTodosData] =
        useState<Itodo[]>(todosData);

    useEffect(() => {
        // update todosData when filering by filterProp (category)
        setFilteredTodosData(filterDataByCategory(todosData, filterProp));

        // update todosDataFromStorage value
        localStorage.setItem('todosDataFromStorage', JSON.stringify(todosData));
    }, [todosData, filterProp]);

    useEffect(() => {
        // check length of filteredTodosData[] for handle display alternative content
        filteredTodosData.length === 0
            ? dispatch(switchTodosDataEmptyStatus({ status: true }))
            : dispatch(switchTodosDataEmptyStatus({ status: false }));
    }, [filteredTodosData, filterProp]);

    useEffect(() => {
        // update page__message text content
        dispatch(setTitle({ title: inputTitleValue }));
    }, [inputTitleValue]);

    const openBurger = (e: React.SyntheticEvent): void => {
        e.stopPropagation(); // for correct work of burger hide/show logic
        burgerHandler.setVisibleStatus(true);
    };

    const editCategoryName = (): void => {
        titleFormHandler.setVisibleStatus(!titleFormHandler.isVisible);
    };

    return (
        <div className="App">
            <div className="page">
                <div className="page__wrapper">
                    <NavLayout
                        setEditableStatus={titleFormHandler.setVisibleStatus}
                    />

                    <main className="main">
                        <div
                            className="page__burger"
                            ref={burgerHandler.refEl}
                        >
                            <Burger
                                isVisible={burgerHandler.isVisible}
                                setVisibleStatus={
                                    burgerHandler.setVisibleStatus
                                }
                            />
                        </div>

                        <section className="page__content">
                            {!burgerHandler.isVisible && (
                                <button
                                    className="page__button page__button--burger"
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
                                    refEl={titleFormHandler.refEl}
                                    isEditable={titleFormHandler.isVisible}
                                    setEditableStatus={
                                        titleFormHandler.setVisibleStatus
                                    }
                                    inputTitleValue={inputTitleValue}
                                    filterProp={filterProp}
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
                                <Form
                                    role={'search'}
                                    text={'Find a task'}
                                />
                            </div>

                            <PageList />

                            <div className="page__footer">
                                <Form
                                    role="add"
                                    text="Add a new task inside"
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
