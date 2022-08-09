import React, { useState } from 'react';

import { Iselect } from '../../types/selectTypes';

import SelectTemplate from './SelectTemplate';

import './select.scss';

// /. imports

const SelectMenu: React.FC = () => {

    const [selectTemplatesData] = useState<Iselect[]>([
        {
            id: 1,
            text: 'All',
            value: 'all',
            isActive: true
        },
        {
            id: 2,
            text: 'Groceries',
            value: 'groceries',
            isActive: false
        },
        {
            id: 3,
            text: 'College',
            value: 'college',
            isActive: false
        },
        {
            id: 4,
            text: 'Payments',
            value: 'payments',
            isActive: false
        }
    ]);

    return (
        <select className="nav-select" defaultValue={selectTemplatesData[0].value}>
            {selectTemplatesData.map((item: Iselect) => {
                return (
                    <SelectTemplate
                        key={item.id}
                        text={item.text}
                        value={item.value}
                        isActive={item.isActive}
                    />
                );
            })}
        </select>
    );
};

export default SelectMenu;