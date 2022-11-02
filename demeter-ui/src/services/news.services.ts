import http from "../http-common";
import { News } from "../types/Types";

class AnnouncementsService {
  getAll() {
    return http.get<Array<News>>("/announcements");
  }

  get(id: string) {
    return http.get<News>(`/announcements/${id}`);
  }

  create(data:News) {
    return http.post<News>("/announcements", data);
  }

  update(data: News, user: String) {
    return http.put<any>(`/announcements/${user}`, data);
  }

  delete(user: string) {
    return http.delete<any>(`/announcements/${user}`);
  }

  deleteAll() {
    return http.delete<any>(`/announcements`);
  }
}

export default new AnnouncementsService();
