import TaskService from "./task.services";
import { Task} from "../types/Types";
import bcrypt from "bcryptjs";

function getAll(){
  const tasks = TaskService.getAll()

    .then((response)=>{
      return response.data;
  })
  .catch((e: Error) => {
      console.log(e);
      return [];
  });
  return tasks;
}


async function getbyCategorie(data: number){
  const tasks = TaskService.getAllbyCategorie(data)
.then((response: any)=>{
      return response.data;
  })
  .catch((e: Error) => {
      console.log(e);
      return [];
  });
  return tasks;
}

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

async function updateTask(data: Task, tkid:number): Promise<boolean> {
  const taskUpdated = TaskService.update(data, tkid)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return taskUpdated;
}

async function deleteTask(id: number) {
  console.log("in deletesTask",id);
  const taskdeleted = TaskService.delete(id)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });

  return taskdeleted;
}


export {getAll,getbyCategorie, createTask, updateTask,deleteTask };
