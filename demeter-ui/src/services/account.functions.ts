import AccountService from "./account.services";
import { Account } from "../types/Types";
import bcrypt from "bcryptjs";

async function createAccount(data: Account): Promise<boolean> {
  const accountCreated = AccountService.create(data)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return accountCreated;
}

async function updateAccount(data: Account, accName: String): Promise<boolean> {
  const accountUpdated = AccountService.update(data, accName)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return accountUpdated;
}

async function deleteAccount(accName: string) {
  const deleted = AccountService.delete(accName)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });

  return deleted;
}

async function getAccountsByRole(role: number) {
  const accounts = AccountService.getByRole(role)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
  return accounts;
}

// vérifies que le mot de passe correspond au mot de passe dans la base de données
async function verifyLogin(accName: string, accPwd: string): Promise<boolean> {
  // retourne le mot de passe encrypté de l'utilisateur en paramètre
  const fetchedPwd = await AccountService.verifyName(accName)
    .then((response: any) => {
      // réponse de la base de données
      return response.data.accPassword;
    })
    .catch((e: Error) => {
      console.log(e);
      return "";
    });

  // compare les deux mots de passe
  if (fetchedPwd) {
    return await bcrypt.compare(accPwd, fetchedPwd);
  } else {
    return false;
  }
}

export { createAccount, updateAccount, getAccountsByRole, verifyLogin, deleteAccount };
