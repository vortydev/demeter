import { useEffect, useState } from "react";
import { LoginPage } from "./components/Login Page/LoginPage";
import { Navbar } from "./components/Templates/Navbar";
import { FooterBar } from "./components/Templates/Footerbar";
import { BodyDemeter } from "./components/Templates/BodyDemeter";
import { getCookie } from "typescript-cookie";
import { getCookieAccount, getCookieRole, getCookiePage } from "./services/cookie.functions";
import "./css/App.css";
import packageJson from '../package.json';

function App() {
  const [pageOn, setPageOn] = useState<string>(getCookiePage());
  const [account, setAccount] = useState<string>("Visiteur");
  const [role, setRole] = useState<string>("0");
  const loggedIn = getCookie("account");

  useEffect(() => {
      // Load cookies
      async function getCookies() {
          setRole(await getCookieRole() || "0");
          setAccount(await getCookieAccount() || "Visiteur");
          setPageOn(getCookiePage());
      }
      getCookies();
  }, [loggedIn]);

  if (loggedIn === undefined) {
    // redirect to login page if disconnected
    return <LoginPage />;
  } 
  else {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar navigateTo={setPageOn} role={role} selected={pageOn} />
        </header>

        <main className="App-body">
          <BodyDemeter selected={pageOn} setSelected={setPageOn} role={role} account={account}/>
        </main>

        <FooterBar appVersion={packageJson.version}/>
      </div>
    );
  }
}

export default App;
