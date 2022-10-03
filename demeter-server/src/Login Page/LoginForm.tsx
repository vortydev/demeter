import {Form, Button} from 'React-Bootstrap';
function LoginForm () : JSX.Element {
    return(
       <div>
       <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Compte : </Form.Label>
        <Form.Control type="text"  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="dark" type="submit">
        Entrer
      </Button>
    </Form>
       </div>
    );

}

export {LoginForm};