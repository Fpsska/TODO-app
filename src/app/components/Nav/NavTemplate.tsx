import React from 'react';

import { Inav } from '../../types/navTypes';
import { Itodo } from '../../types/todoTypes';

// /. imports

interface propTypes {
    id: number;
    text: string;
    category: string;
    link: string;
    isActive: boolean;
    navTemplatesData: Inav[];
    setNavTemplatesData: (arg: Inav[]) => void;
    setTodosData: (arg: Itodo[]) => void;
    filteredTodosData: Itodo[]
}

// /. interfaces

const NavTemplate: React.FC<propTypes> = (props) => {

    const {
        id,
        text,
        category,
        link,
        isActive,
        navTemplatesData,
        setNavTemplatesData,
        setTodosData,
        filteredTodosData
    } = props;

    const filterTodoItems = (): void => {
        switch (category) {
            case 'all':
                setNavTemplatesData(navTemplatesData.map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }));
                setTodosData(filteredTodosData);
                break;
            case 'groceries':
                setNavTemplatesData(navTemplatesData.map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }));
                setTodosData([...filteredTodosData].filter(item => item.category.toLocaleLowerCase() === category));
                break;
            case 'college':
                setNavTemplatesData([...navTemplatesData].map(item => item.category === category ? { ...item, isActive: true } : { ...item, isActive: false }));
                setTodosData([...filteredTodosData].filter(item => item.category.toLocaleLowerCase() === category));
                break;
            case 'payments':
                setNavTemplatesData([...navTemplatesData].map(item => item.category === category ? { ...item, isActive: true } : { ...item, isActive: false }));
                setTodosData([...filteredTodosData].filter(item => item.category.toLocaleLowerCase() === category));
                break;
            default:
                setNavTemplatesData([...navTemplatesData].map(item => item.category === 'all' ? { ...item, isActive: true } : { ...item, isActive: false }));
                setTodosData(filteredTodosData);
        }
    };

    return (
        <li className="nav__item">
            <a className={isActive ? 'nav__link active' : 'nav__link'} href={link} onClick={filterTodoItems}>{text}</a>
        </li>
    );
};

export default NavTemplate;