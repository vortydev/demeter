import TaskService from "./task.services";
import { Task} from "../types/Types";
import bcrypt from "bcryptjs";

async function createTask(data: Task): Promise<boolean> {
  const accountCreated = TaskService.create(data)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return accountCreated;
}

async function updateTask(data: Task, tkName: String): Promise<boolean> {
  const accountUpdated = TaskService.update(data, tkName)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return accountUpdated;
}

async function deleteTask(tkName: string) {
  const deleted = TaskService.delete(tkName)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });

  return deleted;
}


export { createTask, updateTask,deleteTask };
