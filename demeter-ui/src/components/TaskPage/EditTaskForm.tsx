import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { updateTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";



interface CRFormProps {
  task: Task;
  show: boolean;
  close: () => void;
  success: (succes: boolean) => void;
}

function EditTaskForm({ task, close, success, show }: CRFormProps) {
  const [error, setError] = useState<boolean>(false);

  async function handleSubmit() {

    const taskName = document.getElementById("taskName") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const typeTask = document.getElementById("typeTask") as HTMLInputElement;

    const updatedTask: Task = {
      id: task.id,
      title: taskName.value,
      description: description.value,
      categorytaskId: parseFloat(typeTask.value),
      parentId: null,
      completed: false,
      active: false,
      picture: null,
      date: new Date(),
    }

    if (await updateTask(updatedTask)) {
      console.log('it worked !!!!');
      success(true);
      close();
    } else {
      setError(true);
    }
  }

  return (
    <Modal onHide={close} show={show}>
      <Form className="popupForm">
        <h3 className="popupTitle">Nouvelle Tâche</h3>
        <Form.Group className="mb-2" controlId="taskName">
          <Form.Label>Titre</Form.Label>
          <Form.Control defaultValue={task.title} type="text" />
        </Form.Group>

        <Form.Group className="popupSelectBox mb-2">
          <Form.Label className="popupSelectLabel">Type</Form.Label>
          <Form.Select defaultValue={task.categorytaskId} id="typeTask" aria-label="Type">
            <option value="1">Quotidienne</option>
            <option value="2">Hebdomadaire</option>
            <option value="3">Autre</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control defaultValue={task.description} as="textarea" rows={3} />
        </Form.Group>

        <div className="mt-3 popupBtnBox">
          <Button variant="demeter-dark" onClick={close}>Annuler</Button>
          <Button variant="demeter" onClick={handleSubmit}>Confirmer</Button>
        </div>
      </Form>
    </Modal>
  );
}

export { EditTaskForm };
