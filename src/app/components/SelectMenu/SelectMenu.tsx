import React from 'react';

import './select.scss';

// /. imports

const SelectMenu: React.FC = () => {
    return (
        <select className="nav-select" defaultValue={'all'}>
            <option className="nav-select__item active" value="all">all</option>
            <option className="nav-select__item" value="groceries">groceries</option>
            <option className="nav-select__item" value="college">college</option>
            <option className="nav-select__item" value="payments">payments</option>
        </select>
    );
};

export default SelectMenu;