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
  

  async function getWeeklyHistory(date: Date) {
    console.log('in get weekly');
    const taskHistory = TaskHistoryService.getWeeklyHistory(date)
      .then((response: any) => {
        console.log('it work');
        return response.data;
      })
      .catch((e: Error) => {
        console.log(e);
        return [];
      });
    return taskHistory;
  }

  export {createTaskHistory, getWeeklyHistory}