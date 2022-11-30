import http from "../http-common";
import { TaskHistory } from "../types/Types";

class TaskHistoryService {
  getAll() {
    return http.get<Array<TaskHistory>>("/th");
  }

  get(id: string) {
    return http.get<TaskHistory>(`/th/${id}`);
  }

  getWeeklyHistory(date: Date){
    return http.get<TaskHistory>(`/th?week=${date}`);
  }

  ifTodayHistory(date: Date, categoryTaskId: number){
    return http.get<TaskHistory>(`/th?today=${date}&categoryTaskId=${categoryTaskId}`);
  }

  create(data:TaskHistory) {
    return http.post<TaskHistory>("/th", data);
  }

  delete(id: number) {
    return http.delete<any>(`/th/${id}`);
  }
}

export default new TaskHistoryService();
