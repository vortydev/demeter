import React from "react";
import { Button } from "react-bootstrap";
import { removeCookie } from "typescript-cookie";
import "../../css/template.css";

function handleLogout(): void {
  removeCookie("account");
  window.location.reload();
}

class Footerbar extends React.Component {
  render(): React.ReactNode {
    return (
      <footer className="App-footer">
        <div>
          <p>Cette application est une propriété de <span className="LVR">Les Vraies Richesses</span></p>{" "}
          <Button className="deco btn-demeter-dark" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </footer>
    );
  }
}

export { Footerbar };
