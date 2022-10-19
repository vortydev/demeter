import { render } from "@testing-library/react";
import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { Task } from "../../types/Types";



interface CRFormProps {
  show : boolean;
    close: () => void;
    success: ()=> void;
  }

  function CreateTaskForm({ show ,close, success }: CRFormProps) {

    async function handlesubmit(){
      const taskName = document.getElementById("taskName") as HTMLInputElement;
      const description = document.getElementById("description") as HTMLInputElement;
      const typeTask = document.getElementById("typeTask") as HTMLInputElement;
      const taskParent = document.getElementById("") as HTMLInputElement;

      const newTask: Task = {
        taskName: taskName.value,
        description: description.value,
      };
  
      if (await createTask(newTask)) {
        success();
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
          <Form.Select className="mb-3" aria-label="TACHE PARENT : ">
            <option>Aucune</option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
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
