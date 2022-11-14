import { useState } from "react";
import { Alert, Button, Form, Modal, Nav } from "react-bootstrap";

interface AccountNavProps {
  subPage: number;
  setSubPage: (location: number) => void;
}

const AccountNav = ({ subPage, setSubPage }: AccountNavProps) => {
  // use subPage to change the class of the a and make it green and pretty :3
  return (
    <section className="accountNav navbar">
      <Nav defaultActiveKey="role1" variant="tabs">
        <Nav.Item>
          <Nav.Link onClick={() => setSubPage(1)} eventKey="role1">
            Administration
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setSubPage(2)} eventKey="role2">
            Succursales
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setSubPage(3)} eventKey="role3">
            Livraison
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* <nav className="accountNav navbar navbar-expand-sm navbar-light">
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" onClick={() => setSubPage(1)}>
                Administration <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setSubPage(2)}>
                Succursales
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setSubPage(3)}>
                Livraison
              </a>
            </li>
          </ul>
        </div>
      </nav> */}
    </section>


  );
}

export { AccountNav };
