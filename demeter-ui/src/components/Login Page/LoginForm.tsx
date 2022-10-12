import { SyntheticEvent, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { setCookie } from "typescript-cookie";
import { verifyLogin } from "../../services/account.functions";

function LoginForm(): JSX.Element {
  const [valid, setValid] = useState<boolean>(true);
  const fakeAccount: string = "Gotham";
  const fakePW: string = "batman";

  function handleLogin(e: SyntheticEvent): void {
    e.preventDefault();
    setValid(true);

    const accName = document.getElementById("account") as HTMLInputElement;
    const pw = document.getElementById("password") as HTMLInputElement;

    // const loggedIn = validateLogin(account.value, pw.value);
    // if(loggedIn){setCookie("account", loggedIn)} // can we stock an object ? if not 2 cookie, one with name, the other with permission
    if (verifyLogin(accName.value, pw.value)) {
      console.log("yo");
      setCookie("account", accName.value); // to be change for account id when other verif are done
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
