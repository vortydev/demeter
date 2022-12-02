import { TaskHistory } from "../types/Types";
import TaskHistoryService from "./taskHistory.services";

async function createTaskHistory(data: TaskHistory) {
  const thCreated = TaskHistoryService.create(data)
    .then((response: any) => {
      console.log("in create Task History", data);
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
  console.log('category',taskCategory);
  const taskHistory = TaskHistoryService.ifTodayHistory(date, taskCategory)
    .then((response: any) => {
      console.log(response.data);
      return response.data.length  > 0;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return taskHistory;
}



export { createTaskHistory, getWeeklyHistory, ifTodayHistory };
