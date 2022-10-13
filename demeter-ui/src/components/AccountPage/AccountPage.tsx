import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { AccountList } from "./AccountList";
import { AccountNav } from "./AccountNav";
import { CreateAccountForm } from "./CreateAccountForm";

function AccountPage(): JSX.Element {
  const [createAccount, setCreateAccount] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [subPage, setSubPage] = useState<string>("admin");

  function success(): void {
    setSuccess(true);
    close();
  }

  function close(): void {
    setCreateAccount(false);
  }

  return (
    <div>
      <AccountNav subPage={subPage} setSubPage={setSubPage} />
      {createdSuccess && (<Alert>Le compte à été créer avec succès!</Alert>)}
      <AccountList currentRole={subPage} />
      <Button
        variant="secondary"
        onClick={() => {
          setCreateAccount(true);
          setSuccess(false);
        }}
      >
        Nouveau compte
      </Button>
       <CreateAccountForm show={createAccount} close={close} success={success} />
    </div>
  );
}

export { AccountPage };
