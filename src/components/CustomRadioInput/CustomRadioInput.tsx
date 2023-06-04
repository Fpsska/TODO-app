import React from 'react';

import { makeStringFormatting } from 'utils/helpers/makeStringFormatting';

// /. imports

interface propTypes {
    name: string;
    value: string;
    inputRadioValue: string;
    onInputChangeEvent: (arg: string) => void;
}

const CustomRadioInput: React.FC<propTypes> = props => {
    const { name, value, inputRadioValue, onInputChangeEvent } = props;

    return (
        <label className="edit-form__label">
            <input
                className="edit-form__radio"
                type="radio"
                name={name}
                value={value}
                checked={value === inputRadioValue}
                onChange={e => onInputChangeEvent(e.target.value)}
            />
            <span className="edit-form__radio--fake"></span>
            <span
                className="edit-form__radio--text"
                title={makeStringFormatting(value)}
            >
                {makeStringFormatting(value)}
            </span>
        </label>
    );
};

export default CustomRadioInput;
