import React from 'react';

// /. imports

interface propTypes {
    text: string;
    value: string;
}

// /. interfaces

const SelectTemplate: React.FC<propTypes> = ({ text, value }) => {
    return (
        <option
            className="nav-select__item"
            value={value.toLowerCase().trim()}
        >
            {text}
        </option>
    );
};

export default SelectTemplate;
