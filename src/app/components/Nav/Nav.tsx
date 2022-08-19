import React from 'react';

import { Inav } from '../../types/navTypes';

import NavTemplate from './NavTemplate';

import './nav.scss';

// /. imports

interface propTypes {
    navTemplatesData: Inav[];
    setNavTemplatesData: (arg: Inav[]) => void;
    setCurrentNavID: (arg: number) => void;
    setCurrentCategoryID: (arg: number) => void;
}

// /. interfaces


const Nav: React.FC<propTypes> = ({ navTemplatesData, setNavTemplatesData, setCurrentNavID, setCurrentCategoryID  }) => {

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
                            setCurrentNavID={setCurrentNavID}
                            setCurrentCategoryID={setCurrentCategoryID}
                        />
                    );
                })}
            </ul>
        </nav>
    );
};

export default Nav;