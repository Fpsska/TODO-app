import React from 'react';

import { useAreaHandler } from 'utils/hooks/useAreaHandler';

import { findTodosItemByName, addNewTodosItem } from 'app/slices/todoSlice';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { generateUniqueID } from 'utils/helpers/generateUniqueID';

import NavLayout from 'components/Nav/NavLayout';
import TodoForm from 'components/TodoForm/TodoForm';
import Burger from 'components/Burger/Burger';
import TitleForm from 'components/TitleForm/TitleForm';
import PageList from 'components/PageList/PageList';

import './App.css';
import 'assets/styles/_styles.scss';
import 'assets/styles/_media.scss';

// /. imports

const App: React.FC = () => {
    const { categoryTemplatesData, filterCompareValue, taskTitleValue } =
        useAppSelector(state => state.todoSlice);

    const { navTemplatesData } = useAppSelector(state => state.navSlice);

    const dispatch = useAppDispatch();

    const burgerAreaHandler = useAreaHandler({ initialStatus: false });
    const titleFormAreaHandler = useAreaHandler({ initialStatus: false });

    // /. hooks usage

    const openBurger = (e: React.SyntheticEvent): void => {
        e.stopPropagation(); // for correct work of burger hide/show logic
        burgerAreaHandler.setVisibleStatus(true);
    };

    const onSearchInputChange = (value: string): void => {
        dispatch(findTodosItemByName({ value }));
    };

    const onCreateInputChange = (value: string): void => {
        dispatch(
            addNewTodosItem({
                id: generateUniqueID(),
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
                                    type="button"
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
                                    inputRef={titleFormAreaHandler.refEl}
                                    isEditable={titleFormAreaHandler.isVisible}
                                    setEditableStatus={
                                        titleFormAreaHandler.setVisibleStatus
                                    }
                                    inputTitleValue={taskTitleValue}
                                    filterCompareValue={filterCompareValue}
                                    navTemplatesData={navTemplatesData}
                                    categoryTemplatesData={
                                        categoryTemplatesData
                                    }
                                />
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
