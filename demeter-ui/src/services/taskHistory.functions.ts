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
  const taskHistory = TaskHistoryService.getWeeklyHistory(date)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
  return taskHistory;
}

async function ifTodayHistory(date: Date, taskCategory: number) {
  const taskHistory = TaskHistoryService.ifTodayHistory(date, taskCategory)
    .then((response: any) => {
      console.log('the return should be true');
     return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return taskHistory;
}



export { createTaskHistory, getWeeklyHistory, ifTodayHistory };
