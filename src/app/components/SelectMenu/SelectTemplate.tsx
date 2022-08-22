import React, { useState, useEffect } from 'react';

// /. imports

interface propTypes {
    text: string;
    value: string;

    todosData: any[];
    filterProp: string;
}

// /. interfaces

const SelectTemplate: React.FC<propTypes> = ({ text, value }) => {

    return (
        <option className="nav-select__item" value={value}>{`${text} (${0})`}</option>
    );
};

export default SelectTemplate;