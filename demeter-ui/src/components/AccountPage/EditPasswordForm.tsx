import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { Account } from "../../types/Types";
import bcrypt from "bcryptjs";
import { updateAccount } from "../../services/account.functions";

interface CRFormProps {
  show: boolean;
  account: Account;
  close: () => void;
  setEditSuccess: (success: boolean) => void;
}

function EditPasswordForm({
  show,
  account,
  close,
  setEditSuccess,
}: CRFormProps) {
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [regexValidPassword, setRegexValidPassword] = useState<boolean>(true);

  setTimeout(() => {
    setValidPassword(true);
    setRegexValidPassword(true);
  }, 5000);

  async function handleSubmit() {
    const pw = document.getElementById("password") as HTMLInputElement;
    const pwc = document.getElementById("passwordConfirm") as HTMLInputElement;

    setValidPassword(true);
    setRegexValidPassword(true);

    const regexPassword = new RegExp (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}/);

    if (pw.value !== pwc.value || !pw.value || !pwc.value) {
      setValidPassword(false);
    } 
    else if(!regexPassword.test(pw.value)) {
      setRegexValidPassword(false);
    } 
    else {
      const editedAccount: Account = {
        accName: account.accName,
        accPassword: bcrypt.hashSync(pw.value),
        roleId: account.roleId,
        stateId: account.stateId, // must be change at somepoint for a field value
      };
      if (await updateAccount(editedAccount, account.accName)) {
        setEditSuccess(true);
        close();
      }
    }
  }

  return (
    <Modal show={show} onHide={close}>
      <Form className="popupForm">
      {!regexValidPassword && (
          <Alert variant="danger">
            Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial. Sa longueur minimale doit être de 5 caractères.
          </Alert>
        )}
        {!validPassword && (<Alert variant="danger">Les mots de passe ne correspondent pas !</Alert>)}
        <h3 className="popupTitle">Édition du Compte</h3>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Nouveau mot de passe</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Group className="mb-2" controlId="passwordConfirm">
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <div className="mt-3 popupBtnBox">
          <Button variant="demeter-dark" onClick={close}>Annuler</Button>
          <Button variant="demeter" onClick={handleSubmit}>Confirmer</Button>
        </div>
      </Form>
    </Modal>
  );
}

export { EditPasswordForm };
