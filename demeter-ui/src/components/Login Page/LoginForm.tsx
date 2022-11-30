import { SyntheticEvent, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { setCookie } from "typescript-cookie";
import { verifyLogin } from "../../services/account.functions";
import bcrypt from "bcryptjs";

function LoginForm(): JSX.Element {
  const [valid, setValid] = useState<boolean>(true);
  const [empty, setEmpty] = useState<boolean>(false);
  
  async function handleLogin(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    setValid(true);
    setEmpty(false);

    const accName = document.getElementById("account") as HTMLInputElement;
    const pw = document.getElementById("password") as HTMLInputElement;

    if (!accName.value || !pw.value) {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 5000);
    } else {
      const verification = await verifyLogin(accName.value, pw.value)
      if (verification !== null) {
        setCookie("account", await bcrypt.hash(accName.value,10) ,  { expires: 1, secure: true, sameSite: 'strict' });
        setCookie("role", verification,  { expires: 1, secure: true, sameSite: 'strict' } );  // gotta do the same than account
        window.location.reload();
      } else {
        setValid(false);
  
        setTimeout(() => {
          setValid(true)
        }, 5000);
      }
    }
  }

  return (
    <Form className="popupForm loginForm">
      {!valid && <Alert variant="danger">Informations invalides !</Alert>}
      {empty && <Alert variant="danger">Veuillez remplir tout les champs</Alert>}
      <Form.Group className="mb-3 loginField" controlId="account">
        <Form.Label>Nom d'utilisateur</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3 loginField" controlId="password">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <div className="popupBtnBox mt-3">
        <Button className="loginBtn" variant="demeter-dark" onClick={handleLogin}>
          Connexion
        </Button>
      </div>
    </Form>
  );
}

export { LoginForm };
