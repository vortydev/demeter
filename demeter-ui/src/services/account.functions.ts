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

async function updateAccount(data: Account, id:Number): Promise<boolean> {
  const accountUpdated = AccountService.update(data, id)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return accountUpdated;
}




async function verifyLogin(accName: string, accPwd: string): Promise<boolean> {
  const fetchedPwd = await AccountService.verifyName(accName)
    .then((response: any) => {
      return response.data.accPassword;
    })
    .catch((e: Error) => {
      console.log(e);
      return "";
    });

  return await bcrypt.compare(accPwd, fetchedPwd);
}

export { createAccount, updateAccount, verifyLogin };
