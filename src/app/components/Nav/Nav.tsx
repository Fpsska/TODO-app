import React from 'react';

import './nav.scss';

// /. imports

const Nav: React.FC = () => {
    return (
        <nav className="nav">
            <li className="nav__item">
                <a className="nav__link active" href="#">All</a>
            </li>
            <li className="nav__item">
                <a className="nav__link" href="#">Groceries</a>
            </li>
            <li className="nav__item">
                <a className="nav__link" href="#">College</a>
            </li>
            <li className="nav__item">
                <a className="nav__link" href="#">Payments</a>
            </li>
        </nav>
    );
};

export default Nav;