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

  getAllByParent(parentId : number){
    return http.get<Task>(`/tasks?parentId=${parentId}`); 
  }

  create(data:Task) {
    return http.post<Task>("/tasks", data);
  }

  update(data: Task) {
    return http.put<any>(`/tasks/${data.id}`, data);
  }

  delete(id: number) {
    return http.delete<any>(`/tasks/${id}`);
  }
}

export default new TaskService();
