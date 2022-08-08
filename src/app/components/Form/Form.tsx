import React from 'react';

import './form.scss';

// /. imports

const Form: React.FC = () => {
    return (
        <form className="form" action="">
            <input className="form__input" type="text" placeholder="Add a new task insdie ‘All’ category" />
        </form>
    );
};

export default Form;