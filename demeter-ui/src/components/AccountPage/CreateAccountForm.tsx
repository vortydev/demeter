import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { createAccount } from "../../services/AccountEndpoint";

interface CAFormProps {
  show : boolean;
  close: () => void;
  success: ()=> void;
}

function CreateAccountForm({ show, close, success }: CAFormProps) {
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const accountName = document.getElementById("account") as HTMLInputElement;
  const pw = document.getElementById("password") as HTMLInputElement;
  const pwc = document.getElementById("passwordConfirm") as HTMLInputElement;
  const permissions = document.getElementById(
    "permissions"
  ) as HTMLInputElement;

  async function handleSubmit(): Promise<void>{
    setValidPassword(true);
    setError(false);

    if (pw.value !== pwc.value) {
      // add regex at some point ?
      setValidPassword(false);
    } else {
      if(await createAccount(accountName.value, pw.value, parseInt(permissions.value))){
        success();
      }else {
        setError(true);
      }
     
    }
  }

  return (
    <Modal show={show} onHide={close}>
      <Form>
        <Form.Group className="mb-3" controlId="account">
          <Form.Label>NOM DU COMPTE: </Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        {!validPassword && (
          <Alert variant="danger">
            {" "}
            Les mots de passe ne correspondent pas.
          </Alert>
        )}
        {error && (
          <Alert variant="danger">
            {" "}
            Une erreure est survenue. Le compte n'a pas été créer.
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>MOT DE PASSE:</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordConfirm">
          <Form.Label>CONFIRMER MOT DE PASSE:</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Select aria-label="permissions">
          <option>Choisir le rôle</option>
          <option value="0">Gestion</option>
          <option value="1">Succursale</option>
          <option value="2">Livreur</option>
          <option value="3">Autre</option>
        </Form.Select>
        <Button onClick={handleSubmit}>AJOUTER</Button>{" "}
        <Button onClick={close}>ANNULER</Button>
      </Form>
    </Modal>
  );
}

export { CreateAccountForm };
