import AnnouncementsService from "./news.services";
import { News} from "../types/Types";

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

async function getNewsByRole(data: number | undefined){

  if(data !== undefined)
{  const news = AnnouncementsService.getByRole(data)
.then((response: any)=>{
      return response.data;
  })
  .catch((e: Error) => {
      console.log(e);
      return [];
  });
  return news;}
  return [];
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

async function deleteNews(id: number) {
  const deleted = AnnouncementsService.delete(id)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });

  return deleted;
}


export { createNews, updateNews,deleteNews, getNewsByRole };
