import { render } from "@testing-library/react";
import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { createTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";



interface CRFormProps {
  show: boolean;
  close: () => void;
  success: (succedd: boolean) => void;
}

function CreateTaskForm({ show, close, success }: CRFormProps) {
  const [error, setError] = useState<boolean>(false);
  const [priority, setPriority] = useState<boolean>(false);

  async function handlesubmit() {
    const taskName = document.getElementById("taskName") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const typeTask = document.getElementById("typeTask") as HTMLInputElement;

    const newTask: Task = {
      id: 1,
      title: taskName.value,
      description: description.value,
      categorytaskId: parseFloat(typeTask.value),
      parentId: 0,
      active:true,
      completed: false,
      picture: null,
      date: new Date(),
      responsable: null,
      priority : priority, 
    };

    if (await createTask(newTask)) {
      success(true);
      setPriority(false);
      close();
    } else {
      setError(true);
    }
  }

  return (
    <Modal show={show} onHide={close}>
      <Form className="popupForm">
      <h3 className="popupTitle">Nouvelle Tâche</h3>
        <Form.Group className="mb-2" controlId="taskName">
          <Form.Label>Titre</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="popupSelectBox mb-2">
          <Form.Label className="popupSelectLabel">Type</Form.Label>
          <Form.Select id="typeTask" aria-label="Type">
            <option value="1">Quotidienne</option>
            <option value="2">Hebdomadaire</option>
            <option value="3">Autre</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="priority">
              <Form.Check onChange={()=>setPriority(!priority)} type="checkbox" label="Priorité" />
            </Form.Group>


        <div className="mt-3 popupBtnBox">
          <Button variant="demeter-dark" onClick={close}>Annuler</Button>
          <Button variant="demeter" onClick={handlesubmit}>Confirmer</Button>
        </div>
      </Form>
    </Modal>
  );
}

export { CreateTaskForm };
