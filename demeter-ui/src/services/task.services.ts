import http from "../http-common";
import { Task } from "../types/Types";

class TaskService {
  getAll() {
    return http.get<Array<Task>>("/tasks");
  }

  get(id: string) {
    return http.get<Task>(`/tasks/${id}`);
  }

  getAllbyCategorie(categorytaskId: number) {
    return http.get<Task>(`/tasks?categorytaskId=${categorytaskId}`);
  }

  create(data:Task) {
    return http.post<Task>("/tasks", data);
  }

  update(data: Task, user: String) {
    return http.put<any>(`/task/${user}`, data);
  }

  delete(id: number) {
    return http.delete<any>(`/task/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/task`);
  }
}

export default new TaskService();
