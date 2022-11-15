import { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { CreateTaskForm } from "./createTaskForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface TaskNavProps {
  taskCategory: number;
  setTaskCategory: (location: number) => void;
  setSuccess: (succeed: boolean) => void;
  success: boolean;
}

function TaskNav({ taskCategory, setTaskCategory, success, setSuccess }: TaskNavProps) {
  const [createTask, setCreateTask] = useState<boolean>(false);

  function close(): void {
    setCreateTask(false);
  }

  const role = getCookie("role");

  return (
    <section className="accountNav navbar">
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
        <Nav.Item>
          <Nav.Link onClick={() => setTaskCategory(3)} eventKey="tache3">
            Autres
          </Nav.Link>
        </Nav.Item>
        {(role == "1" || role == "4") && <Nav.Item>
          <FontAwesomeIcon className="iconAdd" icon={faPlus} size="lg" onClick={() => {
            setCreateTask(true);
            setSuccess(false);
          }} />
        </Nav.Item>}
        <CreateTaskForm show={createTask} close={close} success={setSuccess} />
      </Nav>
    </section>
  );
}

export { TaskNav };
