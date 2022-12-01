import { Nav } from "react-bootstrap";

interface AccountNavProps {
  subPage: number;
  setSubPage: (location: number) => void;
}

const AccountNav = ({ subPage, setSubPage }: AccountNavProps) => {
  // use subPage to change the class of the a and make it green and pretty :3
  return (
    <section className="navbar">
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
        <Nav.Item>
          <Nav.Link onClick={() => setSubPage(0)} eventKey="role4">
            Département
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setSubPage(9)} eventKey="role9">
            App
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </section>


  );
}

export { AccountNav };
