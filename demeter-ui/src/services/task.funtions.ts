import TaskService from "./task.services";
import { Task } from "../types/Types";

function getAll() {
  const tasks = TaskService.getAll()

    .then((response) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
  return tasks;
}

function getTask(id: number) {
  const tasks = TaskService.get(id.toString())
    .then((response) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return undefined;
    });
  return tasks;
}

async function getbyCategorie(data: number) {
  const tasks = TaskService.getAllbyCategorie(data)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
  return tasks;
}

async function getTasksByParent(data: number) {
  const tasks = TaskService.getAllByParent(data)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
  return tasks;
}

async function createTask(data: Task) {
  const taskCreated = TaskService.create(data)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return null;
    });
  return taskCreated;
}

async function updateTask(data: Task): Promise<boolean> {
  const taskUpdated = TaskService.update(data)
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

async function resetTask(tasks: Task[]){
for (const task of tasks){
  const resetingTask : Task ={
    ...task,
    completed: false,
    responsable: "",
  }
  if(!await updateTask(resetingTask)){
    console.log('error in reset');
  }
}
}

export {
  getAll,
  getbyCategorie,
  getTasksByParent,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  resetTask,
};
