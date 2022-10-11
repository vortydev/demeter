import { Button } from "react-bootstrap";
import { getAccounts } from "../../services/AccountEndpoint";
import { Account } from "../../types/Types";

interface AccountListProps {
  currentRole: string;
}

function AccountList({ currentRole }: AccountListProps) {
  const listAccount: Account[] = getAccounts(currentRole);
  // make get account work
  // map the list with the accountRow

  return (
    <div className="accountList">
      {listAccount.map((account) => (
        <AccountRow currentAccount={account} />
      ))}
    </div>
  );
}

interface AccountRowProps {
  currentAccount: Account;
}

function AccountRow({ currentAccount }: AccountRowProps) {
  return (
    <div className="accountInfo">
      <span>{currentAccount.name}</span> <Button>Edit</Button>{" "}
      <Button>Delete</Button>
    </div>
  );
}

export { AccountList };
