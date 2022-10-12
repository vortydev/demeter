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

  update(data: Account, id: any) {
    return http.put<any>(`/accounts/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/accounts/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/accounts`);
  }

  verify(accName: string, accPwd: string) {
    const data: any = {accName: accName, accPwd: accPwd};
    return http.get<any>(`/accounts`, data);
  }
}

export default new AccountService();
