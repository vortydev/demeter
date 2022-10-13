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


  function handleSubmit() {
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
        stateId: account.stateId, // must be change at somepoint
      };
      updateAccount(editedAccount, account.accName);
    }

    setEditSuccess(true);
    close();
  }
  return (
    <Modal show={show} onHide={close}>
      <Form>
        {validPassword && (<Alert variant="danger"> Les mots de passe ne correspondent pas !</Alert>)}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>NOUVEAU MOT DE PASSE : </Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ConfirmPassword">
          <Form.Label>CONFIRMATION MOT DE PASSE : </Form.Label>
          <Form.Control as="text" />
        </Form.Group>
      </Form>
      <Button onClick={handleSubmit}> Yeah !</Button>
    </Modal>
  );
}

export { EditPasswordForm };
