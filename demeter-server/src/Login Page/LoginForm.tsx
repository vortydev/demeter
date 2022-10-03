import { SyntheticEvent } from 'react';
import {Form, Button} from 'react-bootstrap';
import { setCookie } from 'typescript-cookie'

function LoginForm () : JSX.Element {

    

function handleLogin(e: SyntheticEvent): void {
  e.preventDefault();
  const account = document.getElementById('account') as HTMLInputElement;
  const pw = document.getElementById('password') as HTMLInputElement;
  setCookie('account', account.value); // to be change for account id when other verif are done
  window.location.reload();

}

    return(
       <div>
       <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="account">
        <Form.Label>Compte : </Form.Label>
        <Form.Control type="text"  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Mot de passe :</Form.Label>
        <Form.Control type="password"  />
      </Form.Group>
      <Button variant="dark" type="submit" >
        Entrer
      </Button>
    </Form>
       </div>
    );

}

export {LoginForm};