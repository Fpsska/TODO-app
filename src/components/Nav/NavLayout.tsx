import React from 'react';

import { useAppSelector } from 'app/hooks';

import { useWidthHandler } from 'utils/hooks/useWidthHandler';

import SelectMenu from '../SelectMenu/SelectMenu';
import CategoryForm from '../CategoryForm/CategoryForm';

import Nav from './Nav';

import './navLayout.scss';

// /. imports

const NavLayout: React.FC = () => {
    const { navTemplatesData } = useAppSelector(state => state.navSlice);

    const { isAllowableRes } = useWidthHandler({ min: 0, max: 768 });

    // /. hooks

    return (
        <aside className="page__nav">
            {isAllowableRes ? (
                <nav className="page__nav-select">
                    <SelectMenu />
                </nav>
            ) : (
                <Nav navTemplatesData={navTemplatesData} />
            )}
            <div className="page__category-form">
                <CategoryForm />
            </div>
        </aside>
    );
};

export default NavLayout;
