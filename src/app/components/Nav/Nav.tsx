import React, { useEffect } from 'react';

import { Inav } from '../../types/navTypes';

import NavTemplate from './NavTemplate';

import './nav.scss';

// /. imports

interface propTypes {
    navTemplatesData: Inav[];
    setEditableStatus: (arg: boolean) => void;
}

// /. interfaces

const Nav: React.FC<propTypes> = props => {
    const { setEditableStatus, navTemplatesData } = props;

    useEffect(() => {
        // update navDataFromStorage value
        localStorage.setItem(
            'navDataFromStorage',
            JSON.stringify(navTemplatesData)
        );
    }, [navTemplatesData]);

    return (
        <nav className="nav">
            <ul className="nav__menu">
                {navTemplatesData.map((item: Inav) => {
                    return (
                        <NavTemplate
                            key={item.id}
                            {...item}
                            setEditableStatus={setEditableStatus}
                        />
                    );
                })}
            </ul>
        </nav>
    );
};

export default Nav;
