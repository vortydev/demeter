import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { AccountList } from "./AccountList";
import { AccountNav } from "./AccountNav";
import { CreateAccountForm } from "./CreateAccountForm";

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

  return (
    <div>
      <AccountNav subPage={subPage} setSubPage={setSubPage} />
      {createdSuccess && <Alert>Le compte a été créé avec succès!</Alert>}
      {editedSuccess && <Alert>Le compte a été modifié avec succès!</Alert>}
      {deletedSuccess && <Alert>Le compte a été supprimé avec succès!</Alert>}
      <AccountList
        currentRole={subPage}
        setEditSuccess={setEditSuccess}
        createSuccess={createdSuccess}
        deleteSuccess={deletedSuccess}
        setDeleteSuccess={setDeleted}
      />
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
