import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import {
  getAll,
  getbyCategorie,
  resetTask,
} from "../../services/task.funtions";
import { Task, TaskHistory } from "../../types/Types";
import { CreateTaskForm } from "./createTaskForm";
import { TaskNav } from "./TaskNav";
import { TaskRow } from "./TaskRow";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faClock,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import { DailyTaskDisplay } from "./TasksDisplay/DailyTaskDisplay";
import { HebdoTaskDisplay } from "./TasksDisplay/HebdoTaskDisplay";
import { OtherTaskDisplay } from "./TasksDisplay/OtherTaskDisplay";

function TaskPage(): JSX.Element {
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deletedSuccess, setDelete] = useState<boolean>(false);
  const [editedSuccess, setEdit] = useState<boolean>(false);
  const [taskCategory, setTaskCategory] = useState<number>(1);
  const [accountTask, setAccountTask] = useState<Task[]>([]);
  const [allCatTask, setAllCatTask] = useState<Task[]>([]);
  const account = getCookie("account") ? getCookie("account") : "Visiteur";
  const role = getCookie("role");
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const [createTask, setCreateTask] = useState<boolean>(false);

  useEffect(() => {
    async function getList() {
      const taskByCat: Task[] = await getbyCategorie(taskCategory);
      setAllCatTask(taskByCat);

      if (role === "2") {
        const taskForAccount: Task[] = taskByCat.filter(
          (t) => t.receiver === account
        );
        setAccountTask(taskForAccount);
      } else if (role === "3") {
        setAccountTask(taskByCat.filter((t) => t.receiver === "delivery"));
      } else {
        setAccountTask(taskByCat);
      }
    }
    getList();
    setTaskCompleted(false);
  }, [
    taskCategory,
    createdSuccess,
    deletedSuccess,
    editedSuccess,
    taskCompleted,
  ]);

  async function resetTasksByCat() {
    //Genérer rapport pour historique ici

    for (const task of allCatTask){
      await enterInHistory(task);
    }
    setTaskCompleted(true);
    resetTask(allCatTask);
  }

  function close(): void {
    setCreateTask(false);
  }

  async function enterInHistory(task : Task){
    const historyInfo : TaskHistory = {
      completionDate : new Date(),
      taskName : task.title,
      whoDid : task.responsable
    }

    // createTaskHistory request here
  }

  return (
    <section className="taskPage">
      <h1 className="pageTitle">Tâches</h1>
      <TaskNav
        taskCategory={taskCategory}
        setTaskCategory={setTaskCategory}
        success={createdSuccess}
        setSuccess={setSuccess}
      />
      {createdSuccess && <Alert>La tâche à été créée avec succès!</Alert>}
      {deletedSuccess && <Alert>La tâche à été supprimée avec succès!</Alert>}

      <div className="btnBar taskBtnBar">
        {(role === "1" || role === "4") && (
          <Button
            variant="icon-outline"
            onClick={() => {
              setCreateTask(true);
              setSuccess(false);
            }}
          >
            <FontAwesomeIcon className="icon" icon={faPlus} size="lg" />
            <span>Nouvelle Tâche</span>
          </Button>
        )}

        {taskCategory === 1 && (
          <div>
            <Button
              className="centerBtn"
              variant="icon-dark"
              onClick={() => {
                resetTasksByCat();
              }}
            >
              <FontAwesomeIcon
                className="iconRefresh"
                icon={faArrowRotateLeft}
                size="lg"
              />
              <span>Commencer la journée</span>
            </Button>

            <DailyTaskDisplay
              listTask={accountTask}
              allCatTask={allCatTask}
              deleteSuccess={setDelete}
              editSuccess={setEdit}
              completedSuccess={setTaskCompleted}
            />
          </div>
        )}

        {taskCategory === 2 && (
          <div>
            <Button
              className="centerBtn"
              variant="icon-dark"
              onClick={() => {
                resetTasksByCat();
              }}
            >
              <FontAwesomeIcon
                className="iconRefresh"
                icon={faArrowRotateLeft}
                size="lg"
              />
              <span>Commencer la semaine</span>
            </Button>

            <HebdoTaskDisplay
              listTask={accountTask}
              allCatTask={allCatTask}
              deleteSuccess={setDelete}
              editSuccess={setEdit}
              completedSuccess={setTaskCompleted}
            />
          </div>
        )}

        {taskCategory === 3 && (
          <div>
            <Button
              className="centerBtn"
              variant="icon-dark"
              onClick={() => {
                resetTasksByCat();
              }}
            >
              <FontAwesomeIcon
                className="iconRefresh"
                icon={faArrowRotateLeft}
                size="lg"
              />
              <span>Réinitialiser</span>
            </Button>

            <OtherTaskDisplay
              listTask={accountTask}
              allCatTask={allCatTask}
              deleteSuccess={setDelete}
              editSuccess={setEdit}
              completedSuccess={setTaskCompleted}
            />
          </div>
        )}
      </div>

      {(role === "1" || role === "4") && (
        <div className="btnBar">
          <Button variant="icon-dark" className="centerBtn">
            <FontAwesomeIcon className="icon" icon={faClock} size="lg" />
            <span>Afficher l'historique</span>
          </Button>
        </div>
      )}
      <CreateTaskForm show={createTask} close={close} success={setSuccess} />
    </section>
  );
}

export { TaskPage };
