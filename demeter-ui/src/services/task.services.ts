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

  update(data: Task, id: number) {
    return http.put<any>(`/tasks/${id}`, data);
  }

  delete(id: number) {
    console.log("taskservice", id);
    return http.delete<any>(`/tasks/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/tasks`);
  }
}

export default new TaskService();
