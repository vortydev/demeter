import AccountService from "./account.services";
import { Account } from "../types/Types";

function createAccount(data: Account): boolean {
    AccountService.create(data)
    .catch((e: Error) => {
        console.log(e);
        return false;
    });
    return true;
}

function verifyLogin(accName: string, accPwd: string): boolean {
    const data: any = {accName: accName, accPwd: accPwd};
    AccountService.verify(data)
    .then(()=> {
        return true;
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