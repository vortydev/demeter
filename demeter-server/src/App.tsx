import React, { useState } from 'react';
import './static/css/App.css';
import { LoginPage } from './Login Page/LoginPage';
import { Navbar } from './Templates/Navbar';
import { Footerbar } from './Templates/Footerbar';
import { getCookie } from 'typescript-cookie';

function App() {

 const loggedIn = getCookie('account');
  if(loggedIn == undefined){
    return (<LoginPage/>);}
  else {
return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
      <body className="App-body">this is where the body goes</body>
     <Footerbar/>
    </div>
  );
  }
}

export default App;
