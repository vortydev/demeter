import React from "react";
import { Button } from "react-bootstrap";
import { removeCookie } from "typescript-cookie";

function handleLogout(): void {
  removeCookie("account");
  window.location.reload();
}

class Footerbar extends React.Component {
  render(): React.ReactNode {
    return (
      <footer className="App-footer">
        <div className="flexFooter">
          <p>Valéry Beauchemin, Étienne Ménard, David Pelletier, Isabelle Rioux © 2022</p>
          {/* <p>Cette application est une propriété de <span className="LVR">Les Vraies Richesses</span></p> */}
          <Button className="deco" variant="demeter-dark" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </footer>
    );
  }
}

export { Footerbar };
