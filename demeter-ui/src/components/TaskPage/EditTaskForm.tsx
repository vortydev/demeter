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
      success(true);
      close();
    } else {
      setError(true);
    }
  }

  return (
    <Modal onHide={close} show={show}>
      <Form>
        <Form.Group className="mb-3"  controlId="taskName">
          <Form.Label>NOM : </Form.Label>
          <Form.Control defaultValue={task.title} type="text" />
        </Form.Group>
        <Form.Select className="mb-3" defaultValue={task.categorytaskId} id="typeTask" aria-label="TYPE : ">
          <option value="1">Quotidiennes</option>
          <option value="2">Hebdomadaires</option>
          <option value="3">Autre</option>
        </Form.Select>
        <Form.Group>
          <Form.Label>Tâche enfant(s) : </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>DESCRIPTION : </Form.Label>
          <Form.Control defaultValue={task.description} as="textarea" rows={3} />
        </Form.Group>
        <Button onClick={handleSubmit}>Ajouter</Button>
        <Button onClick={close}>Annuler</Button>
      </Form>
    </Modal>
  );
}

export { EditTaskForm };
