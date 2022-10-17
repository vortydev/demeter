import http from "../http-common";
import { Task } from "../types/Types";

class TaskService {
  getAll() {
    return http.get<Array<Task>>("/tasks");
  }

  get(id: string) {
    return http.get<Task>(`/tasks/${id}`);
  }

  create(data:Task) {
    return http.post<Task>("/tasks", data);
  }

  update(data: Task, user: String) {
    return http.put<any>(`/task/${user}`, data);
  }

  delete(user: string) {
    return http.delete<any>(`/task/${user}`);
  }

  deleteAll() {
    return http.delete<any>(`/task`);
  }
}

export default new TaskService();
