import React from 'react';

import { makeStringFormatting } from 'utils/helpers/makeStringFormatting';

// /. imports

interface propTypes {
    text: string;
    category: string;
}

// /. interfaces

const SelectTemplate: React.FC<propTypes> = ({ text, category }) => {
    return (
        <option
            className="nav-select__item"
            value={makeStringFormatting(category)}
        >
            {text}
        </option>
    );
};

export default SelectTemplate;
