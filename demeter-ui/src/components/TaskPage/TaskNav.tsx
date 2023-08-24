import { Nav } from "react-bootstrap";

interface TaskNavProps {
  setTaskCategory: (location: number) => void;
}

function TaskNav({ setTaskCategory }: TaskNavProps) {

  return (
    <section className="navbar">
      <Nav defaultActiveKey="tache1" variant="tabs">
        <Nav.Item>
          <Nav.Link onClick={() => setTaskCategory(1)} eventKey="tache1">
            Quotidiennes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTaskCategory(2)} eventKey="tache2">
            Hebdomadaires
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </section>
  );
}

export { TaskNav };
