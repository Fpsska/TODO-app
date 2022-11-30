import React, { useEffect } from 'react';

import { useAppDispatch } from '../../../store/hooks';

import { setInputTitleValue } from '../../../store/slices/todoSlice';

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

    const dispatch = useAppDispatch();

    useEffect(() => {
        // update navDataFromStorage value
        localStorage.setItem(
            'navDataFromStorage',
            JSON.stringify(navTemplatesData)
        );
        // update inputTitleValue
        const cuttentCategory = navTemplatesData.find(item => item.isActive);
        if (cuttentCategory) {
            dispatch(setInputTitleValue({ title: cuttentCategory.text }));
        }
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
