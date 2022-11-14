import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { getAll, getbyCategorie, resetTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";
import { CreateTaskForm } from "./createTaskForm";
import { TaskNav } from "./TaskNav";
import { TaskRow } from "./TaskRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

function TaskPage(): JSX.Element {
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deletedSuccess, setDelete] = useState<boolean>(false);
  const [editedSuccess, editSuccess] = useState<boolean>(false);
  const [taskCategory, setTaskCategory] = useState<number>(1);
  const [listTask, setListTask] = useState<Task[]>([]);
  const [accountTask, setAccountTask] = useState<Task[]>([]);
  const [allCatTask, setAllCatTask] = useState<Task[]>([]);
  const account = getCookie("account") ? getCookie("account") : "Visiteur";
  const role = getCookie("role");
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);

  useEffect(() => {
    async function getList() {
      const taskByCat: Task[] = await getbyCategorie(taskCategory);
      setAllCatTask(taskByCat);
      setListTask(taskByCat.filter((t) => t.parentId === 0));
      console.log(listTask);
      if (role === "2") {
        const taskForAccount: Task[] = listTask.filter((t) => t.receiver === account);
        console.log(taskForAccount);
        setAccountTask(taskForAccount);
      } else if (role === "3") {
        setAccountTask(listTask.filter((t) => t.receiver === "delivery"));
      }

    }
    getList();
    setTaskCompleted(false);
  }, [taskCategory, createdSuccess, deletedSuccess, editedSuccess, taskCompleted]);

  async function resetTasksByCat() {
    //Genérer rapport pour historique ici
    setTaskCompleted(true);
    resetTask(allCatTask);
  }

  return (
    <div>
      <h1 className="pageTitle">Tâches</h1>
      <TaskNav
        taskCategory={taskCategory}
        taskCategoryName=""
        setTaskCategory={setTaskCategory}
        success={createdSuccess}
        setSuccess={setSuccess}
      />
      {createdSuccess && <Alert>La tâche à été créée avec succès!</Alert>}
      {deletedSuccess && <Alert>La tâche à été supprimée avec succès!</Alert>}
      <h4>Liste de tâches {taskCategory}</h4>
      {taskCategory === 1 && <Button className="taskPageResetBtn" variant="outline-dark" onClick={() => resetTasksByCat()}><FontAwesomeIcon className="iconRefresh mr-2" icon={faArrowRotateRight} size="lg" /><span>Commencer la journée</span></Button>}
      {taskCategory === 2 && <Button className="taskPageResetBtn" variant="outline-dark" onClick={() => resetTasksByCat()}><FontAwesomeIcon className="iconRefresh" icon={faArrowRotateRight} size="lg" /><span>Commencer la semaine</span></Button>}

      <div className="taskRowBox flex">
        {role !== "2" && role !== "3" && listTask.map((Task) => (
          <TaskRow task={Task} listTask={allCatTask} deleteSuccess={setDelete} editSuccess={editSuccess} completedSuccess={setTaskCompleted} />
        ))}
        {(role === "2" || role === "3") && accountTask.map((Task) => (
          <TaskRow task={Task} listTask={allCatTask} deleteSuccess={setDelete} editSuccess={editSuccess} completedSuccess={setTaskCompleted} />
        ))}
      </div>

      <Button variant="outline-dark" >Afficher L'Historique</Button>
    </div>
  );
}

export { TaskPage };
