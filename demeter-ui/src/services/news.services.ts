import http from "../http-common";
import { News } from "../types/Types";

class AnnouncementsService {
  getAll() {
    return http.get<Array<News>>("/announcements");
  }

  get(id: string) {
    return http.get<News>(`/announcements/${id}`);
  }

  getByRole(roleId: number){
    return http.get<News>(`/announcements?roleId=${roleId}`);
  }

  create(data:News) {
    return http.post<News>("/announcements", data);
  }

  update(id: number, data: News,) {
    return http.put<any>(`/announcements/${id.toString()}`, data);
  }

  delete(id: number) {
    return http.delete<any>(`/announcements/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/announcements`);
  }
}

export default new AnnouncementsService();
