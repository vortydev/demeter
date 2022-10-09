import { render } from "@testing-library/react";
import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";



interface CRFormProps {
    close: () => void;
    success: ()=> void;
  }

  function EditPasswordForm({ close, success }: CRFormProps) {
    return(
      <Modal>
        <Form>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>NOUVEAU MOT DE PASSE : </Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="ConfirmPassword">
            <Form.Label>CONFIRMATION MOT DE PASSE : </Form.Label>
            <Form.Control as="text"/>
          </Form.Group>
        </Form>
      </Modal>
    );
  }

  export { EditPasswordForm };
