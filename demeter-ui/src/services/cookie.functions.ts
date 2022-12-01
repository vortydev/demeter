import bcrypt from "bcryptjs";
import { getCookie } from "typescript-cookie";
import { Account, Role } from "../types/Types";
import { getAccounts, getRoles } from "./account.functions";

async function getCookieAccount() {
    const connected = getCookie("account") ? getCookie("account") : "Visiteur";
    const accountList: Account[] = await getAccounts();
    var account = null;
    if(connected != "Visiteur" && connected) {
        for (var i = 0; i < accountList.length; i++){
            var result = await bcrypt.compare(accountList[i].accName, connected);
            if (result){
                account = accountList[i].accName;
                return account;
            }
        }
    }
    return "Visiteur";
}

async function getCookieRole(){
    const role = getCookie("role");
    const roleList: Role[] = await getRoles();
    var roleId = null;
    if (role) {
        for (var i = 0; i < roleList.length; i++){
            var result = await bcrypt.compare(roleList[i].id.toString(), role);
            if (result) {
                roleId = roleList[i].id.toString();
                return roleId;
            }
        }
    }
    else {
        return "0";
    }
}

export { getCookieAccount, getCookieRole};