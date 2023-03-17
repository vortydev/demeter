import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { removeCookie } from "typescript-cookie";
import logoDemeterW from "../../img/DemeterLogoWhite.png";

interface FooterBarProps {
  appVersion: string
}

function FooterBar({ appVersion }: FooterBarProps) {
  const [versionVisibility, setVersionVisibility] = useState<boolean>(false);

  function toggleVisibility() {
    setVersionVisibility(!versionVisibility);
  }

  function handleLogout(): void {
    removeCookie("account");
    removeCookie("role");
    window.location.reload();
  }

  return (
    <footer className="App-footer">
      <div className="flexFooter">
        <div className="footerText flex">
          <div className="flexLogoBody" onClick={toggleVisibility}>
            <img className="demeterLogo" src={logoDemeterW} alt="Logo de Demeter" />
            <span id="appVersion" className={`${versionVisibility ? "" : "hide"}`}>v{appVersion}</span>
          </div>
          
          <p>Équipe Demeter © 2022-2023</p>
        </div>

        <Button className="deco" variant="demeter-waxed" onClick={handleLogout}>
          Déconnexion
        </Button>
      </div>
    </footer>
  );
}

export { FooterBar };
