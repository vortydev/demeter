import TaskService from "./task.services";
import { Task} from "../types/Types";
import bcrypt from "bcryptjs";

async function createTask(data: Task): Promise<boolean> {
  console.log(`in create task`,data)
  const taskCreated = TaskService.create(data)
    .then((response: any) => {
      console.log('the response was good !');
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return taskCreated;
}

async function updateTask(data: Task, tkName: String): Promise<boolean> {
  const taskUpdated = TaskService.update(data, tkName)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return taskUpdated;
}

async function deleteTask(tkName: string) {
  const taskdeleted = TaskService.delete(tkName)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });

  return taskdeleted;
}


export { createTask, updateTask,deleteTask };
