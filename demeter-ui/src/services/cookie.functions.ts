import bcrypt from "bcryptjs";
import { getCookie } from "typescript-cookie";
import { Account } from "../types/Types";
import { getAccounts } from "./account.functions";

async function getCookieAccount() {
    const connected = getCookie("account") ? getCookie("account") : "Visiteur";
    const accountList: Account[] = await getAccounts();
    var account = null;
    if(connected != "Visiteur" && connected) {
        for (var i = 0; i < accountList.length; i++){
            var result = await bcrypt.compare(accountList[i].accName, connected);
            if (result){
                account = accountList[i];
                return account;
            }
        }
        if (account) {
          return account;
        }
        else {
            return {accName: "Visiteur", accPassword: "", roleId: 0, stateId: 0};
        }
    }
    else {
        return {accName: "Visiteur", accPassword: "", roleId: 0, stateId: 0};
    }
}

export { getCookieAccount };