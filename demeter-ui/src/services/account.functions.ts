import AccountService from "./account.services";
import { Account } from "../types/Types";
import bcrypt from "bcryptjs";

function createAccount(data: Account): boolean {
    AccountService.create(data)
    .catch((e: Error) => {
        console.log(e);
        return false;
    });
    return true;
}

function verifyLogin(accName: string, accPwd: string): boolean {
    // const data: any = {accName: accName, accPwd: accPwd};
    // AccountService.verify(data)
    AccountService.verifyName(accName)
    .then(async (response: any)=> {
        const valid = await bcrypt.compare(accPwd, response.data.accPassword);
        console.log("COMPARESYNC", valid);
        return valid;
    })
    .catch((e: Error) => {
        console.log(e);
        return false;
    });
    return false;
}

export { 
    createAccount,
    verifyLogin,
};