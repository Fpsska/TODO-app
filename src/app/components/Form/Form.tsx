import React from 'react';

import './form.scss';

// /. imports

interface propTypes {
    text: string
}

const Form: React.FC<propTypes> = ({ text }) => {
    return (
        <form className="form" onSubmit={e => e.preventDefault()}>
            <input className="form__input" type="text" placeholder={text} />
        </form>
    );
};

export default Form;