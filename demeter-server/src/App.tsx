import React from 'react';
import logo from './static/img/logo.svg';
import './static/css/App.css';
import { Navbar } from './Templates/Navbar';
import { Footerbar } from './Templates/Footerbar';


function App() {


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

export default App;
