import React, { useState } from "react";
import "./App.css";
import { getCookie } from "typescript-cookie";
import { LoginPage } from "./components/Login Page/LoginPage";
import { Navbar } from "./components/Templates/Navbar";
import { Footerbar } from "./components/Templates/Footerbar";
import { BodyDemeter } from "./components/Templates/BodyDemeter";

function App() {
  const [pageOn, setPageOn] = useState<string>("news");
  const loggedIn = getCookie("account");
  if (loggedIn == undefined) {
    return <LoginPage />;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar navigateTo={setPageOn} />
        </header>
        <body className="App-body">
          <BodyDemeter selected={pageOn} />
        </body>
        <Footerbar />
      </div>
    );
  }
}

export default App;
