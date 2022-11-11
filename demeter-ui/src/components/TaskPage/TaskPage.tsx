import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { getAll, getbyCategorie, resetTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";
import { CreateTaskForm } from "./createTaskForm";
import { TaskNav } from "./TaskNav";
import { TaskRow } from "./TaskRow";

function TaskPage(): JSX.Element {
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deletedSuccess, setDelete] = useState<boolean>(false);
  const [editedSuccess, editSuccess] = useState<boolean>(false);
  const [taskCategory, setTaskCategory] = useState<number>(1);
  const [listTask, setListTask] = useState<Task[]>([]);
  const [accountTask, setAccountTask]= useState<Task[]>([]);
  const [allCatTask, setAllCatTask] = useState<Task[]>([]);
<<<<<<< HEAD
  const account = getCookie("account") ? getCookie("account") : "Visiteur";
  const role = getCookie("role");
=======
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
>>>>>>> origin/dev

  useEffect(() => {
    async function getList() {
      const taskByCat: Task[] = await getbyCategorie(taskCategory);
      setAllCatTask(taskByCat);
      setListTask(taskByCat.filter((t) => t.parentId === 0));
<<<<<<< HEAD
      console.log(listTask);
      if(role == "2"){
      const taskForAccount :Task[] = listTask.filter((t) => t.receiver == account);
      console.log(taskForAccount);
      setAccountTask(taskForAccount);
      }else if(role == "3"){
        setAccountTask(listTask.filter((t) => t.receiver == "delivery"));
      }
  
    }
    getList();
  }, [taskCategory, createdSuccess,deletedSuccess, editedSuccess, listTask]);
=======
      setTaskCompleted(false);
  
    }
    getList();
  }, [taskCategory,createdSuccess,deletedSuccess, editedSuccess, taskCompleted]);
>>>>>>> origin/dev
  
  async function resetTasksByCat(){
    //Genérer rapport pour historique ici
    setTaskCompleted(true); 
    resetTask(allCatTask);
  }

  return (
    <div>
      <h1 className="pageTitle">Tâches</h1>
      <TaskNav
        taskCategory={taskCategory}
        setTaskCategory={setTaskCategory}
        success={createdSuccess}
        setSuccess={setSuccess}
      />
      {createdSuccess && <Alert>La tâche à été créée avec succès!</Alert>}
      {deletedSuccess && <Alert>La tâche à été supprimée avec succès!</Alert>}
      <p>Liste de tâches {taskCategory}</p>
      {taskCategory ===1 && <Button onClick={()=>resetTasksByCat()}>Commencer la journée</Button>}
      {taskCategory ===2 && <Button onClick={()=>resetTasksByCat()}>Commencer la semaine</Button>}

      <div>
<<<<<<< HEAD
      {role != "2" && role !="3"  && listTask.map((Task) => (
        <TaskRow task={Task} listTask={allCatTask} deleteSuccess={setDelete} editSuccess={editSuccess} />
      ))}
       {(role == "2" || role == "3")  && accountTask.map((Task) => (
        <TaskRow task={Task} listTask={allCatTask} deleteSuccess={setDelete} editSuccess={editSuccess} />
=======
      {listTask.map((Task) => (
        <TaskRow task={Task} listTask={allCatTask} deleteSuccess={setDelete} editSuccess={editSuccess}  completedSuccess={setTaskCompleted} />
>>>>>>> origin/dev
      ))}
    </div>
      
      <Button variant="outline-dark" >Afficher L'Historique</Button>
    </div>
  );
}

export { TaskPage };
