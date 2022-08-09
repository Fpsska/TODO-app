import React from 'react';

// /. imports

interface propTypes {
    text: string;
    link: string;
    isActive: boolean
}

// /. interfaces

const NavTemplate: React.FC<propTypes> = ({ text, link, isActive }) => {
    return (
        <li className="nav__item">
            <a className={isActive ? 'nav__link active' : 'nav__link'} href={link}>{text}</a>
        </li>
    );
};

export default NavTemplate;