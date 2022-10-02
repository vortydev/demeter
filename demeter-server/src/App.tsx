import React from 'react';
import logo from './static/img/logo.svg';
import './static/css/App.css';
import { Navbar } from './Navbar';
import { Footerbar } from './Footerbar';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenu.e sur Demeter!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body>this is where the body goes</body>
     <Footerbar/>

    </div>
  );
}

export default App;
