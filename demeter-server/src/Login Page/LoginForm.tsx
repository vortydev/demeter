import { SyntheticEvent, useState } from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import { setCookie } from 'typescript-cookie'

function LoginForm () : JSX.Element {
  const [valid, setValid] = useState<boolean>(true);
  const fakeAccount:string = 'Gotham';
  const fakePW : string ='batman';
    

function handleLogin(e: SyntheticEvent): void {

  e.preventDefault();
  setValid(true);

  const account = document.getElementById('account') as HTMLInputElement;
  const pw = document.getElementById('password') as HTMLInputElement;

  if(account.value== fakeAccount && pw.value == fakePW)
 { 
  setCookie('account', account.value); // to be change for account id when other verif are done
  window.location.reload();
}else {
  setValid(false);
}

  

}
    return(
       <div className='LoginForm'>
        <h1>Demeter</h1>
        <hr/>
        <h2>Connexion</h2>
        {!valid && (<Alert variant="danger">Informations invalides !</Alert>)}
       <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3 loginField" controlId="account">
        <Form.Label>Compte : </Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3 loginField" controlId="password">
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