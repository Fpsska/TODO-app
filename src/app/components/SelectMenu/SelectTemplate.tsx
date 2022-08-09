import React from 'react';

// /. imports

interface propTypes {
    text: string;
    value: string;
    isActive: boolean
}

// /. interfaces

const SelectTemplate: React.FC<propTypes> = ({ text, value, isActive }) => {
    return (
        <option className={isActive ? 'nav-select__item active' : 'nav-select__item'} value={value}>{text}</option>
    );
};

export default SelectTemplate;