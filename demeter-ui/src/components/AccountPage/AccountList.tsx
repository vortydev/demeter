import { useState } from "react";
import { Button } from "react-bootstrap";
import { getAccounts } from "../../services/AccountEndpoint";
import { Account } from "../../types/Types";
import { EditPasswordForm } from "./EditPasswordForm";

interface AccountListProps {
  currentRole: string;
  setEditSuccess: (success: boolean) => void;
}

function AccountList({ currentRole, setEditSuccess }: AccountListProps) {
  const listAccount: Account[] = getAccounts(currentRole);
  // make get account work
  // map the list with the accountRow

  return (
    <div className="accountList">
      <AccountRow
        currentAccount={listAccount[0]}
        setEditSuccess={setEditSuccess}
      />
    </div>
  );
}

interface AccountRowProps {
  currentAccount: Account;
  setEditSuccess: (success: boolean) => void;
}

function AccountRow({ currentAccount, setEditSuccess }: AccountRowProps) {
  const [editAccount, setEditAccount] = useState<boolean>(false);

  function close() {
    setEditAccount(false);
  }

  return (
    <div className="accountInfo">
      <span>{currentAccount.accName}</span>{" "}
      <Button
        onClick={() => {
          setEditAccount(true);
        }}
      >
        Edit
      </Button>{" "}
      <Button>Delete</Button>
      <EditPasswordForm
        show={editAccount}
        account={currentAccount}
        close={close}
        setEditSuccess={setEditSuccess}
      />
    </div>
  );
}

export { AccountList };
