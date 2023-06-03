import React, { useEffect } from 'react';

import { useAppDispatch } from 'app/hooks';

import { setTaskTitleValue } from 'app/slices/todoSlice';

import { Inav } from 'types/navTypes';

import NavTemplate from './NavTemplate';

import './nav.scss';

// /. imports

interface propTypes {
    navTemplatesData: Inav[];
}

// /. interfaces

const Nav: React.FC<propTypes> = props => {
    const { navTemplatesData } = props;

    const dispatch = useAppDispatch();

    useEffect(() => {
        localStorage.setItem(
            'navDataFromStorage',
            JSON.stringify(navTemplatesData)
        );
        // update navDataFromStorage value

        const cuttentCategory = navTemplatesData.find(item => item.isActive);
        if (cuttentCategory) {
            dispatch(setTaskTitleValue({ title: cuttentCategory.text }));
        }
        // update inputTitleValue
    }, [navTemplatesData]);

    return (
        <nav className="nav">
            <ul className="nav__menu">
                {navTemplatesData.map((item: Inav) => {
                    return (
                        <NavTemplate
                            key={item.id}
                            {...item}
                        />
                    );
                })}
            </ul>
        </nav>
    );
};

export default Nav;
