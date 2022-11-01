import { LoginForm } from "./LoginForm";
import logoLVR from "../../img/logoLVR.jpg";
import "../../css/login.css";

function LoginPage(): JSX.Element {
  return (
    <div className="LoginPage flex">
      <div className="flexLoginBox">
        <div className="loginTitleBox mb-4">
          <h1 className="loginTitle">Demeter</h1>
          <hr className="loginLine" />
        </div>
        <LoginForm />
      </div>
      <img className="loginImg" src={logoLVR} alt="Bannière Les Vraies Richesses" />
    </div>
  );
}

export { LoginPage };
