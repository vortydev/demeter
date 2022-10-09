import { render } from "@testing-library/react";
import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";



interface CRFormProps {
    close: () => void;
    success: ()=> void;
  }

  function CreateTaskForm({ close, success }: CRFormProps) {
    return(
      <Modal>
        <Form>
          <Form.Group className="mb-3" controlId="task">
            <Form.Label>NOM : </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Select className="mb-3" aria-label="TYPE : ">
            <option></option>
            <option value="1">Journalier</option>
            <option value="2">Mensuelle</option>
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
        </Form>
      </Modal>
    );
  }

  export { CreateTaskForm };
