import React from 'react';

import Nav from '../Nav/Nav';
import Form from '../Form/Form';

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
          <div className="page__content">

            <h1 className="page__title">All Tasks</h1>

          <Form/>


          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
