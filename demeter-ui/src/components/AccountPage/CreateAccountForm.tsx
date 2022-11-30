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
  const [regexValidPassword, setRegexValidPassword] = useState<boolean>(true);
  const [emptyAccName, setEmptyAccName] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  setTimeout(() => {
    setValidPassword(true);
    setRegexValidPassword(true);
    setEmptyAccName(true);
    setError(false);
  }, 5000);

  async function handleSubmit(): Promise<void> {
    const accountName = document.getElementById("account") as HTMLInputElement;
    const pw = document.getElementById("password") as HTMLInputElement;
    const pwc = document.getElementById("passwordConfirm") as HTMLInputElement;
    const role = document.getElementById("role") as HTMLInputElement;

    setValidPassword(true);
    setRegexValidPassword(true);
    setError(false);

    // TODO check the username is already taken
    // alert Il existe déja un compte de ce nom

    const regexPassword = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}/);

    if (!accountName.value) {
      setEmptyAccName(false);
    }
    else if (pw.value !== pwc.value || !pw.value || !pwc.value) {
      setValidPassword(false);
    }
    else if (!regexPassword.test(pw.value)) {
      setRegexValidPassword(false);
    }
    else {
      const newAccount: Account = {
        accName: accountName.value,
        accPassword: await bcrypt.hash(pw.value, 10),
        roleId: parseInt(role.value),
        stateId: 2
      };

      if (await createAccount(newAccount)) {
        success();
      } else {
        setError(true);
      }
    }
  }

  return (
    <Modal show={show} onHide={close}>
      <Form className="popupForm">
        <h3 className="popupTitle">Nouveau Compte</h3>

        {!validPassword && (
          <Alert variant="danger">
            Les mots de passe ne correspondent pas.
          </Alert>
        )}
        {!emptyAccName && (
          <Alert variant="danger">
            Veuillez entrer un nom d'utilisateur.
          </Alert>
        )}
        {!regexValidPassword && (
          <Alert variant="danger">
            Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial. Sa longueur minimale doit être de 5 caractères.
          </Alert>
        )}
        {error && (
          <Alert variant="danger">
            Une erreur est survenue. Le compte n'a pas été créé.
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="account">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" />
          <p className="inputHint">Le mot de passe doit contenir au minimum :  <br />
            - 5 caractères <br />
            - 1 majuscule <br />
            - 1 minuscule <br />
            - 1 chiffre <br />
            - 1 caractère spécial
          </p>
        </Form.Group>

        <Form.Group className="mb-2" controlId="passwordConfirm">
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <Form.Group className="popupSelectBox mb-2" controlId="role">
          <Form.Label className="popupSelectLabel">Rôle</Form.Label>
          <Form.Select aria-label="role" id="role">
            <option value="1">Administrateur</option>
            <option value="2">Succursale</option>
            <option value="3">Livreur</option>
            <option value="5">Cuisine</option>
            <option value="6">Boulangerie</option>
            <option value="7">Viennoiserie</option>
            <option value="8">Pâtisserie</option>
            <option value="9">App</option>
          </Form.Select>
        </Form.Group>

        <div className="mt-3 popupBtnBox">
          <Button variant="demeter-dark" onClick={close}>Annuler</Button>
          <Button variant="demeter" onClick={handleSubmit}>Confirmer</Button>
        </div>
      </Form>
    </Modal>
  );
}

export { CreateAccountForm };
