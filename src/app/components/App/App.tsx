import React from 'react';

import Nav from '../Nav/Nav';

import './App.css';
import '../../assets/styles/styles.scss';

// /. imports

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="page">
        <div className="page__wrapper">
          <div className="page__nav">
            <Nav />
          </div>
          <div className="page__content"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
