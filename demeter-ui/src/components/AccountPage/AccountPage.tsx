import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { AccountList } from "./AccountList";
import { AccountNav } from "./AccountNav";
import { CreateAccountForm } from "./CreateAccountForm";
import "../../css/account.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AccountPage(): JSX.Element {
  const [createAccount, setCreateAccount] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [editedSuccess, setEditSuccess] = useState<boolean>(false);
  const [deletedSuccess, setDeleted] = useState<boolean>(false);
  const [subPage, setSubPage] = useState<number>(1);

  function success(): void {
    setSuccess(true);
    close();
  }

  function close(): void {
    setCreateAccount(false);
  }

  setTimeout(() => {
    setEditSuccess(false);
    setDeleted(false);
    setSuccess(false);
  }, 5000);

  return (
    <section className="appPage">
      <AccountNav subPage={subPage} setSubPage={setSubPage} />

      {createdSuccess && <Alert variant="success">Le compte a été créé avec succès !</Alert>}
      {editedSuccess && <Alert variant="success">Le compte a été modifié avec succès !</Alert>}
      {deletedSuccess && <Alert variant="success">Le compte a été supprimé avec succès !</Alert>}

      <div className="flex accountContent">
        <AccountList
          currentRole={subPage}
          setEditSuccess={setEditSuccess}
          createSuccess={createdSuccess}
          deleteSuccess={deletedSuccess}
          setDeleteSuccess={setDeleted}
        />
        <Button
          className="addAcc"
          variant="icon-dark"
          onClick={() => {
            setCreateAccount(true);
            setSuccess(false);
          }}
        >
          <FontAwesomeIcon className="icon" icon={faPlus} size="lg" />
          <span>Nouveau Compte</span>
        </Button>
      </div>
      <CreateAccountForm show={createAccount} close={close} success={success} />
    </section>
  );
}

export { AccountPage };
