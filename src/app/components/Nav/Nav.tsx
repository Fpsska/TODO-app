import React, { useState } from 'react';

import { Inav } from '../../types/navTypes';

import NavTemplate from './NavTemplate';

import './nav.scss';

// /. imports

const Nav: React.FC = () => {

    const [navTemplatesData] = useState<Inav[]>([
        {
            id: 1,
            text: 'All',
            link: '#',
            isActive: true
        },
        {
            id: 2,
            text: 'Groceries',
            link: '#',
            isActive: false
        },
        {
            id: 4,
            text: 'College',
            link: '#',
            isActive: false
        },
        {
            id: 5,
            text: 'Payments',
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
                            link={item.link}
                            text={item.text}
                            isActive={item.isActive}
                        />
                    );
                })}
            </ul>
        </nav>
    );
};

export default Nav;