import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getAccountsByRole } from "../../services/account.functions";
import { Account } from "../../types/Types";
import { EditPasswordForm } from "./EditPasswordForm";

interface AccountListProps {
  currentRole: number;
  setEditSuccess: (success: boolean) => void;
}

function AccountList({ currentRole, setEditSuccess }: AccountListProps) {
  const [listAccount, setListAccount] = useState<Account[]>([]);

  useEffect(() => {
    async function getList() {
      setListAccount(await getAccountsByRole(currentRole));
    }
    getList();
  }, [currentRole]);

  // make get account work
  return (
    <div className="accountList">
      {listAccount.map((account) => (
        <AccountRow currentAccount={account} setEditSuccess={setEditSuccess} />
      ))}
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
