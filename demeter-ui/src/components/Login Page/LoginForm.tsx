import { SyntheticEvent, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { setCookie } from "typescript-cookie";
import { verifyLogin } from "../../services/account.functions";

function LoginForm(): JSX.Element {
  const [valid, setValid] = useState<boolean>(true);
  
  async function handleLogin(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    setValid(true);

    const accName = document.getElementById("account") as HTMLInputElement;
    const pw = document.getElementById("password") as HTMLInputElement;

    if (await verifyLogin(accName.value, pw.value)) {
     setCookie("account", accName.value); 
      window.location.reload();
    } else {
      setValid(false);
    }
  }
  return (
    <div className="LoginForm">
      <h1>DEMETER</h1>
      <hr />
      <h2 className="mb-5">Connexion</h2>
      {!valid && <Alert variant="danger">Informations invalides !</Alert>}
      <Form>
        <Form.Group className="mb-3 loginField" controlId="account">
          <Form.Label>COMPTE: </Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3 loginField" controlId="password">
          <Form.Label>MOT DE PASSE:</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Button variant="dark" onClick={handleLogin}>
          ENTRER
        </Button>
      </Form>
    </div>
  );
}

export { LoginForm };
