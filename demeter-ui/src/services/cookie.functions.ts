import bcrypt from "bcryptjs";
import { getCookie, setCookie } from "typescript-cookie";
import { Account, Role } from "../types/Types";
import { getAccounts, getRoles } from "./account.functions";

async function getCookieAccount() {
    const connected = getCookie("account") ? getCookie("account") : "Visiteur";
    const accountList: Account[] = await getAccounts();
    var account = null;
    if (connected !== "Visiteur" && connected) {
        for (var i = 0; i < accountList.length; i++) {
            var result = await bcrypt.compare(accountList[i].accName, connected);
            if (result) {
                account = accountList[i].accName;
                return account;
            }
        }
    }
    return "Visiteur";
}

async function getCookieRole() {
    const role = getCookie("role");
    const roleList: Role[] = await getRoles();
    var roleId = null;
    if (role) {
        for (var i = 0; i < roleList.length; i++) {
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

const pageList: string[] = ["news", "task", "inventory", "recipe", "accounts"];

function getCookiePage() {
    const page = getCookie("page");
    if (page) {
        for (var i = 0; i < pageList.length; i++) {
            if (i.toString() === page) {
                return pageList[i];
            }
        }
    }
    // else
    setCookie("page", 0, { expires: 1, secure: true, sameSite: 'strict' });
    return pageList[0];
    
}

function setCookiePage(setPage:string) {
    const pos = getCookie("page");
    if (pos && pageList[parseInt(pos)] === setPage) return;

    // update pos
    for (var i = 0; i < pageList.length; i++) {
        if (pageList[i] === setPage) {
            setCookie("page", i, { expires: 1, secure: true, sameSite: 'strict' });
            return;
        }
    }
}

export { getCookieAccount, getCookieRole, getCookiePage, setCookiePage };