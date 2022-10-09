import { LoginForm } from "./LoginForm";
import logoLVR from "../static/img/logoLVR.jpg";
import "./login.css";

function LoginPage(): JSX.Element {
  return (
    <div className="LoginPage">
      <img src={logoLVR} alt="Bannière Les Vraies Richesses" />
      <LoginForm />
    </div>
  );
}

export { LoginPage };
