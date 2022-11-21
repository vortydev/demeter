import { TaskHistory } from "../types/Types";
import TaskHistoryService from "./taskHistory.services";

async function createTaskHistory(data: TaskHistory) {
    const thCreated = TaskHistoryService.create(data)
      .then((response: any) => {
        return response.data;
      })
      .catch((e: Error) => {
        console.log(e);
        return null;
      });
    return thCreated;
  }
  

  export {createTaskHistory}