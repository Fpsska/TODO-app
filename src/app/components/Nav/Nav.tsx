import React, { useState } from 'react';

import { Inav } from '../../types/navTypes';
import { Itodo } from '../../types/todoTypes';

import NavTemplate from './NavTemplate';

import './nav.scss';

// /. imports

interface propTypes {
    navTemplatesData: Inav[];
    setNavTemplatesData: (arg: Inav[]) => void;
    setCurrentNavID:  (arg: number) => void;
    filteredTodosData: Itodo[];
    todosData: Itodo[];
    setTodosData: (arg: Itodo[]) => void;
    setFilteredTodosData: (arg: Itodo[]) => void;
    setTitle: (arg: string) => void;
    isDataTLoading: boolean
}

// /. interfaces

const Nav: React.FC<propTypes> = (props) => {

    const {
        navTemplatesData,
        setNavTemplatesData,
        setCurrentNavID,
        todosData,
        setTodosData,
        filteredTodosData,
        setFilteredTodosData,
        setTitle,
        isDataTLoading
    } = props;


    return (
        <nav className="nav">
            <ul className="nav__menu">
                {navTemplatesData.map((item: Inav) => {
                    return (
                        <NavTemplate
                            key={item.id}
                            id={item.id}
                            link={item.link}
                            text={item.text}
                            category={item.category}
                            isActive={item.isActive}
                            navTemplatesData={navTemplatesData}
                            setCurrentNavID={setCurrentNavID}
                            setNavTemplatesData={setNavTemplatesData}
                            todosData={todosData}
                            setTodosData={setTodosData}
                            filteredTodosData={filteredTodosData}
                            setFilteredTodosData={setFilteredTodosData}
                            setTitle={setTitle}
                            isDataTLoading={isDataTLoading}
                        />
                    );
                })}
            </ul>
        </nav>
    );
};

export default Nav;