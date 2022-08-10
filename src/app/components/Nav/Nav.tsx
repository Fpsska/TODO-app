import React, { useState } from 'react';

import { Inav } from '../../types/navTypes';
import { Itodo } from '../../types/todoTypes';

import NavTemplate from './NavTemplate';

import './nav.scss';

// /. imports

interface propTypes {
    filteredTodosData: Itodo[];
    todosData: Itodo[];
    setTodosData: (arg: Itodo[]) => void;
    setFilteredTodosData: (arg: Itodo[]) => void;
    setTitle: (arg: string) => void
}

// /. interfaces

const Nav: React.FC<propTypes> = ({ todosData, setTodosData, filteredTodosData, setFilteredTodosData, setTitle }) => {

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
                            setNavTemplatesData={setNavTemplatesData}
                            todosData={todosData}
                            setTodosData={setTodosData}
                            filteredTodosData={filteredTodosData}
                            setFilteredTodosData={setFilteredTodosData}
                            setTitle={setTitle}
                        />
                    );
                })}
            </ul>
        </nav>
    );
};

export default Nav;