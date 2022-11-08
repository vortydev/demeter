import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import {
  deleteAccount,
  getAccountsByRole,
} from "../../services/account.functions";
import { Account } from "../../types/Types";
import { EditPasswordForm } from "./EditPasswordForm";
import { confirmAlert } from "react-confirm-alert";

interface AccountListProps {
  currentRole: number;
  setEditSuccess: (success: boolean) => void;
  createSuccess: boolean;
  setDeleteSuccess: (success: boolean) => void;
  deleteSuccess: boolean;
}

function AccountList({
  currentRole,
  setEditSuccess,
  createSuccess,
  setDeleteSuccess,
  deleteSuccess,
}: AccountListProps) {
  const [listAccount, setListAccount] = useState<Account[]>([]);

  useEffect(() => {
    async function getList() {
      setListAccount(await getAccountsByRole(currentRole));
    }
    getList();

  }, [currentRole, createSuccess, deleteSuccess]);

  //  allows the system to refresh after deleting a second account
  setTimeout(() => {
    setDeleteSuccess(false);
  }, 5000);

  // make get account work
  return (
    <div className="accountList">
      {listAccount.map((account) => (
        <AccountRow currentAccount={account} setEditSuccess={setEditSuccess} setDeleteSuccess={setDeleteSuccess} />
      ))}
    </div>
  );
}

interface AccountRowProps {
  currentAccount: Account;
  setEditSuccess: (success: boolean) => void;
  setDeleteSuccess: (success: boolean) => void;
}

function AccountRow({
  currentAccount,
  setEditSuccess,
  setDeleteSuccess,
}: AccountRowProps) {
  const [editAccount, setEditAccount] = useState<boolean>(false);

  function close() {
    setEditAccount(false);
  }

  return (
    <div className="flex">
      <span className="accountName">{currentAccount.accName}</span>
      <div className="accountEditBox">
        <FontAwesomeIcon className="iconEdit cursor" icon={faEdit} size="lg" onClick={() => {
          setEditAccount(true);
        }} />
        <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
          confirmAlert({
            title: 'Confirmation',
            message: 'Êtes-vous sur de vouloir supprimer ce compte?',
            buttons: [
              {
                label: 'Oui',
                onClick: () => {deleteAccount(currentAccount.accName); setDeleteSuccess(true);}
              },
              {
                label: 'Non',
                onClick: () => {}
              }
            ]
          });
          
        }} />
      </div>
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
