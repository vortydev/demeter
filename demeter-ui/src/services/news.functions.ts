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

async function updateNews(data: News, newsName: String): Promise<boolean> {
  const announcementUpdated = AnnouncementsService.update(data, newsName)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return announcementUpdated;
}

async function deleteNews(newsName: string) {
  const deleted = AnnouncementsService.delete(newsName)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });

  return deleted;
}


export { createNews, updateNews,deleteNews };