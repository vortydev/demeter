import React from "react";
import { Button } from "react-bootstrap";
import { removeCookie } from "typescript-cookie";
import logoDemeterW from "../../img/DemeterLogoWhite.png";

function handleLogout(): void {
  removeCookie("account");
  removeCookie("role");
  window.location.reload();
}

class Footerbar extends React.Component {
  render(): React.ReactNode {
    return (
      <footer className="App-footer">
        <div className="flexFooter">
          <div className="footerText flex">
            <img className="demeterLogo" src={logoDemeterW} alt="Logo de Demeter" />
            <p>Équipe Demeter © 2022-2023</p>
          </div>
          <Button className="deco" variant="demeter-waxed" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </footer>
    );
  }
}

export { Footerbar };
