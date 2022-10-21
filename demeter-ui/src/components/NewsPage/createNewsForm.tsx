import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

interface CRFormProps {
  show: boolean;
  close: () => void;
  success: () => void;
}

function CreateNewsForm({ show, close, success }: CRFormProps) {

  return (
    <Modal show={show} onHide={close}>
      <Form className="popupForm">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titre</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Label>Auteur</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Select className="mb-3" aria-label="DESTINATAIRES : ">
          <option>Choisir les destinataires</option>
          <option value="1">Administrateurs</option>
          <option value="2">Employés</option>
          <option value="3">Livreurs</option>
        </Form.Select>
        <div className="mt-3 popupBtnBox">
          <Button variant="demeter-dark" onClick={() => { console.log("CANCEL ADD NEWS") }}>Annuler</Button>
          <Button variant="demeter" onClick={() => { console.log("ADD NEWS") }}>Ajouter</Button>
        </div>
      </Form>
    </Modal>
  );
}

export { CreateNewsForm };