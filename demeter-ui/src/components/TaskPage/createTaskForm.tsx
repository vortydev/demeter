import { render } from "@testing-library/react";
import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";



interface CRFormProps {
  show :boolean;
    close: () => void;
    setSuccess: (succeed:boolean)=> void;
  }

  function CreateTaskForm({ show ,close, setSuccess }: CRFormProps) {
    return(
      <Modal show={show} onHide={close}>
        <Form>
          <Form.Group className="mb-3" controlId="task">
            <Form.Label>NOM : </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Select className="mb-3" aria-label="TYPE : ">
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
          <Button onClick={()=>{console.log("Click!")}}>Ajouter</Button>
          <Button onClick={()=>{console.log("Cancel!")}}>Annuler</Button>
        </Form>
      </Modal>
    );
  }

  export { CreateTaskForm };
