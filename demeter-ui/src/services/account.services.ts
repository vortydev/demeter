import http from "../http-common";
import { Account } from "../types/Types";

class AccountService {
  getAll() {
    return http.get<Array<Account>>("/accounts");
  }

  get(id: string) {
    return http.get<Account>(`/accounts/${id}`);
  }

  create(data: Account) {
    return http.post<Account>("/accounts", data);
  }

  update(data: Account, id: Number) {
    return http.put<any>(`/accounts/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/accounts/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/accounts`);
  }

  verify(data: any) {
    // const data: any = {accName: accName, accPwd: accPwd};
    console.log(data);
    return http.get<Account>(`/verify`, data);
  }

  verifyName(user: string) {
    return http.get<Account>(`/verify/${user}`);
  }
}

export default new AccountService();
