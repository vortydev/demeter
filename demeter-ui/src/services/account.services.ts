import http from "../http-common";
import { Account, Role } from "../types/Types";

class AccountService {
  getAll() {
    return http.get<Array<Account>>("/accounts");
  }

  getByRole(roleId: number) {
    return http.get<Account>(`/accounts?roleId=${roleId}`);
  }

  get(id: string) {
    return http.get<Account>(`/accounts/${id}`);
  }

  create(data: Account) {
    return http.post<Account>("/accounts", data);
  }

  update(data: Account, user: String) {
    return http.put<any>(`/accounts/${user}`, data);
  }

  delete(user: string) {
    return http.delete<any>(`/accounts/${user}`);
  }

  deleteAll() {
    return http.delete<any>(`/accounts`);
  }

  verifyName(user: string) {
    return http.get<Account>(`/verify/${user}`);
  }

  getRoles() {
    return http.get<Array<Role>>(`/categories/roles`);
  }
}

export default new AccountService();
