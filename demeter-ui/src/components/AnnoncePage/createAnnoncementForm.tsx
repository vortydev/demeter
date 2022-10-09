import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

interface CRFormProps {
    close: () => void;
    success: ()=> void;
  }

  function CreateAnnoncementForm({ close, success }: CRFormProps) {

    return(
      <Modal onHide={close}>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>TITRE : </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="author">
            <Form.Label>AUTEUR : </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Select className="mb-3" aria-label="DESTINATAIRES : ">
            <option>Choisir</option>
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

  export { CreateAnnoncementForm };