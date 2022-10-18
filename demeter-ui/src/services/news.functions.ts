import AnnouncementsService from "./news.services";
import { News} from "../types/Types";
import bcrypt from "bcryptjs";

async function createNews(data: News): Promise<boolean> {
  const announcementCreated = AnnouncementsService.create(data)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return announcementCreated;
}

async function updateAnnouncement(data: News, announcementName: String): Promise<boolean> {
  const announcementUpdated = AnnouncementsService.update(data, announcementName)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return announcementUpdated;
}

async function deleteAnnouncement(announcementName: string) {
  const deleted = AnnouncementsService.delete(announcementName)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });

  return deleted;
}


export { createNews, updateAnnouncement,deleteAnnouncement };
