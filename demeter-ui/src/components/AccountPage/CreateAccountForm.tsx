import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { createAccount } from "../../services/account.functions";
import { Account } from "../../types/Types";
import bcrypt from "bcryptjs";

interface CAFormProps {
  show: boolean;
  close: () => void;
  success: () => void;
}

function CreateAccountForm({ show, close, success }: CAFormProps) {
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);


  async function handleSubmit(): Promise<void> {
    const accountName = document.getElementById("account") as HTMLInputElement;
    const pw = document.getElementById("password") as HTMLInputElement;
    const pwc = document.getElementById("passwordConfirm") as HTMLInputElement;
    const role = document.getElementById("role") as HTMLInputElement;

    setValidPassword(true);
    setError(false);

    if (pw.value !== pwc.value && pw.value !== null) {
      // add regex at some point ?
      setValidPassword(false);
    } else {
      const newAccount: Account = {
        accName: accountName.value,
        accPassword: bcrypt.hashSync(pw.value),
        roleId: parseInt(role.value),
        stateId: 2
      };

      if (createAccount(newAccount)) {
        success();
      } else {
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
            Une erreur est survenue. Le compte n'a pas été créé.
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
        <Form.Select aria-label="role" id="role">
          <option>Choisir le rôle</option>
          <option value="1">Administrateur</option>
          <option value="2">Employé</option>
          <option value="3">Livreur</option>
        </Form.Select>
        <Button onClick={handleSubmit}>AJOUTER</Button>{" "}
        <Button onClick={close}>ANNULER</Button>
      </Form>
    </Modal>
  );
}

export { CreateAccountForm };
