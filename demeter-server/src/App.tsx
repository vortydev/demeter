import React from 'react';
import logo from './static/img/logo.svg';
import './static/css/App.css';
import { LoginPage } from './Login Page/LoginPage';

function App() {
 const loggedIn = false;
  if(!loggedIn){
    return (<LoginPage/>);}
  else {
return (
    <div className="App">
      <header className="App-header">
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
    </div>
  );}
}

export default App;
