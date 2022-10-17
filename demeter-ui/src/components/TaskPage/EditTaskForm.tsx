import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";



interface CRFormProps {
    close: () => void;
    success: ()=> void;
  }

  function EditTaskForm({ close, success }: CRFormProps) {
    return(
      <Modal onHide ={close}>
        <Form>
          
          <Button onClick={() =>{}}>Confirmer</Button>
          <Button onClick={() =>{}}>Annuler</Button>
        </Form>
      </Modal>
    );
  }

  export { EditTaskForm };
