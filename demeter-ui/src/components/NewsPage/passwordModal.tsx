import { Button, Form, Modal } from "react-bootstrap";
import bcrypt from "bcryptjs";
import { getAccountsByRole } from "../../services/account.functions";
import { Account } from "../../types/Types";

interface pwModalProps {
  show: boolean;
  close: () => void;
  setCreateNews: (auth: boolean) => void;
}

function PasswordModal({ show, setCreateNews, close }: pwModalProps) {
  async function validatePw() {
    const pw = (document.getElementById("password") as HTMLInputElement).value;

    const appPasswords : Account[] = await getAccountsByRole(9);

    for(const appPw of appPasswords){
      if (await bcrypt.compare(pw, appPw.accPassword)) {
        close();
        setCreateNews(true);
      }
    }
  }
  return (
    <Modal show={show}>
      <Modal.Title>Permission requise</Modal.Title>
      <Modal.Body>
        <p>Créer une annonce est une action restrainte</p>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={validatePw}>Envoyer</Button>
        <Button onClick={close}>Annuler</Button>
      </Modal.Footer>
    </Modal>
  );
}

export { PasswordModal };
