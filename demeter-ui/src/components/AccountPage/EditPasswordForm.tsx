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


  async function handleSubmit() {
    const pw = document.getElementById("password") as HTMLInputElement;
    const pwc = document.getElementById("passwordConfirm") as HTMLInputElement;

    if (pw.value !== pwc.value && pw.value !== null) {
      // add regex at some point ?
      setValidPassword(false);
    } else {
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
        <h3 className="popupTitle">Édition du Compte</h3>
        {!validPassword && (<Alert variant="danger">Les mots de passe ne correspondent pas !</Alert>)}
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
