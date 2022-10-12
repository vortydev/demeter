import AccountService from "./account.services";
import { Account } from "../types/Types";
import bcrypt from "bcryptjs";

function createAccount(data: Account): boolean {
  AccountService.create(data).catch((e: Error) => {
    console.log(e);
    return false;
  });
  return true;
}

async function verifyLogin(accName: string, accPwd: string): Promise<boolean> {;
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

export { createAccount, verifyLogin };
