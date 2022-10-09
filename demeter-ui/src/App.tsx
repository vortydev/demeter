import React, { useState } from "react";
import './App.css'
import { getCookie } from "typescript-cookie";
import { LoginPage } from "./components/Login Page/LoginPage";
import { Navbar } from "./components/Templates/Navbar";
import { Footerbar } from "./components/Templates/Footerbar";
import { AccountPage } from "./components/AccountPage/AccountPage";

function App() {
  const loggedIn = getCookie("account");
  if (loggedIn == undefined) {
    return <LoginPage />;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <body className="App-body"><AccountPage/></body>
        <Footerbar />
      </div>
    );
  }
}

export default App;
