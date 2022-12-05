import { useEffect, useState } from "react";
import { LoginPage } from "./components/Login Page/LoginPage";
import { Navbar } from "./components/Templates/Navbar";
import { Footerbar } from "./components/Templates/Footerbar";
import { BodyDemeter } from "./components/Templates/BodyDemeter";
import "./css/App.css";
import { getCookieAccount, getCookieRole } from "./services/cookie.functions";
import { getCookie } from "typescript-cookie";

function App() {
  const [pageOn, setPageOn] = useState<string>("news");
 
  const loggedIn = getCookie("account");
  const [account, setAccount] = useState<string>("Visiteur");
  
  const [role, setRole] = useState<string>("0");
  useEffect(() => {
      async function getRoleId() {
          setRole(await getCookieRole() || "0");
          setAccount(await getCookieAccount() || "Visiteur");
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
          <BodyDemeter selected={pageOn} setSelected={setPageOn} role={role} account={account}/>
        </main>
        <Footerbar />
      </div>
    );
  }
}

export default App;
