import { render } from "@testing-library/react";
import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { createTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";



interface CRFormProps {
show : boolean;
  close: () => void;
  success: (succedd:boolean)=> void;
}

function CreateTaskForm({ show ,close, success }: CRFormProps) {
  const [error, setError] = useState<boolean>(false);

  async function handlesubmit(){
    const taskName = document.getElementById("taskName") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const typeTask = document.getElementById("typeTask") as HTMLInputElement;
    const taskParent = document.getElementById("parentId") as HTMLInputElement;

    const newTask: Task = {
      id:1,
      title: taskName.value,
      description: description.value,
      categorytaskId: parseFloat(typeTask.value),
      parentId: 0 ? null : parseFloat(taskParent.value),
      completed: false,
      picture: null,
      date: new Date(),
    };

    if (await createTask(newTask)) {
      console.log('it worked !!!!');
      success(true);
      close();
    } else {
      setError(true);
    }
  }

  return(
    <Modal show={show} onHide={close}>
      <Form>
        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>NOM : </Form.Label>
          <Form.Control type="text"/>
        </Form.Group>
        <Form.Select className="mb-3" id="typeTask" aria-label="TYPE : ">
          <option></option>
          <option value="1">Quotidiennes</option>
          <option value="2">Hebdomadaires</option>
          <option value="3">Autre</option>
        </Form.Select>
        <Form.Select className="mb-3" id="parentId" aria-label="TACHE PARENT : ">
        <option>Choisir</option>
          <option value="0"> Aucune</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Form.Select>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>DESCRIPTION : </Form.Label>
          <Form.Control as="textarea" rows={3}/>
        </Form.Group>
        <Button onClick={handlesubmit}>Ajouter</Button>
        <Button onClick={close}>Annuler</Button>
      </Form>
    </Modal>
  );
}

export { CreateTaskForm };
