import React, { useState, useLayoutEffect } from 'react';

import Nav from '../Nav/Nav';
import SelectMenu from '../SelectMenu/SelectMenu';
import Form from '../Form/Form';
import TodoList from '../Todo/TodoList';

import './App.css';
import '../../assets/styles/_styles.scss';
import '../../assets/styles/_media.scss';

// /. imports

const App: React.FC = () => {

  const [isTabletScreen, setScreenStatus] = useState<boolean>(false);

  useLayoutEffect(() => {
    window.innerWidth <= 425 ? setScreenStatus(true) : setScreenStatus(false);
  }, []);

  return (
    <div className="App">
      <div className="page">
        <div className="page__wrapper">
          <div className="page__nav">
            {isTabletScreen ? <SelectMenu /> : <Nav />}
          </div>
          <div className="page__content">

            <h1 className="page__title">All Tasks</h1>

            <div className="page__form">
              <Form />
            </div>

            <div className="page__list">
              <TodoList />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
