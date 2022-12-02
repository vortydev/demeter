import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { LoginPage } from "./components/Login Page/LoginPage";
import { Navbar } from "./components/Templates/Navbar";
import { Footerbar } from "./components/Templates/Footerbar";
import { BodyDemeter } from "./components/Templates/BodyDemeter";

import "./css/App.css";
import { getCookieRole } from "./services/cookie.functions";

function App() {
  const [pageOn, setPageOn] = useState<string>("news");
 
  const loggedIn = getCookie("account");
  
  const [role, setRole] = useState<string>("0");
  useEffect(() => {
      async function getRoleId() {
          setRole(await getCookieRole() || "0");
      }
      getRoleId();
  },[loggedIn]);

  if (loggedIn === undefined) {
    return <LoginPage />;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar navigateTo={setPageOn} role={role} />
        </header>
        <main className="App-body">
          <BodyDemeter selected={pageOn} setSelected={setPageOn} role={role}/>
        </main>
        <Footerbar />
      </div>
    );
  }
}

export default App;
