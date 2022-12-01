import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import {
  getbyCategorie,
  resetTask,
} from "../../services/task.funtions";
import { Account, Task, TaskHistory } from "../../types/Types";
import { CreateTaskForm } from "./createTaskForm";
import { TaskNav } from "./TaskNav";
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
import { createTaskHistory, ifTodayHistory } from "../../services/taskHistory.functions";
import { TaskHistoryModal } from "./TaskHistory/TaskHistoryModal";
import { getCookieAccount } from "../../services/cookie.functions";

function TaskPage(): JSX.Element {
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deletedSuccess, setDelete] = useState<boolean>(false);
  const [editedSuccess, setEdit] = useState<boolean>(false);
  const [taskCategory, setTaskCategory] = useState<number>(1);
  const [accountTask, setAccountTask] = useState<Task[]>([]);
  const [allCatTask, setAllCatTask] = useState<Task[]>([]);
  var empty: Account = {accName: "Visiteur", accPassword: "", roleId: 0, stateId: 0};
  const [account, setAccount] = useState<Account>(empty);
  const role = getCookie("role");
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const [createTask, setCreateTask] = useState<boolean>(false);
  const [seeHistory, setSeeHistory] = useState<boolean>(false);
  const [dayStarted, setDayStarted] = useState<boolean>(false);
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  useEffect(() => {
    async function getList() {
      const taskByCat: Task[] = await getbyCategorie(taskCategory);
      setAllCatTask(taskByCat);
      setDayStarted(await ifTodayHistory(date, taskCategory));
      console.log("taskpage await", await ifTodayHistory(date, taskCategory))
      console.log('day Started for :', taskCategory, ":", dayStarted);
      setAccount(await getCookieAccount() || empty);


      if (role === "2") {
        const taskForAccount: Task[] = taskByCat.filter(
          (t) => t.receiver === account.accName
        );
        setAccountTask(taskForAccount);
      } else if (role === "3") {
        setAccountTask(taskByCat.filter((t) => t.receiver === "delivery"));
      } else {
        setAccountTask(taskByCat);
      }
    }
    getList();
  }, [
    taskCategory,
    createdSuccess,
    deletedSuccess,
    editedSuccess,
    taskCompleted,
  ]);

  async function resetTasksByCat() {
    console.log('the date', date);
    for (const task of allCatTask) {
      await enterInHistory(task, date);
    }
    resetTask(allCatTask);
    setTaskCompleted(true);
    setTimeout(() => {
      setTaskCompleted(false);
    }, 100);
  }

  function close(): void {
    setCreateTask(false);
    setSeeHistory(false);
  }

  async function enterInHistory(task: Task, date: Date) {
    const historyInfo: TaskHistory = {
      completionDate: date,
      taskName: task.title,
      whoDid: task.responsable,
      parentId: task.parentId,
      categorytaskId: task.categorytaskId,
    };

    // createTaskHistory request here

    if (!await createTaskHistory(historyInfo)) {
      console.error("failed to add to history");
    }
  }

  return (
    <section className="appPage">
      <TaskNav
        taskCategory={taskCategory}
        setTaskCategory={setTaskCategory}
        success={createdSuccess}
        setSuccess={setSuccess}
      />
      {createdSuccess && <Alert variant="success">La tâche à été créée avec succès!</Alert>}
      {deletedSuccess && <Alert variant="success">La tâche à été supprimée avec succès!</Alert>}

      <div className="btnBar">
        {/* EMPTY BTN */}
        {(role === "1" || role === "4") && (<Button variant="hidden">
          <FontAwesomeIcon className="icon" icon={faPlus} size="lg" />
          <span>Nouvelle Tâche</span>
        </Button>)}

        {taskCategory === 1 && (
          <Button
            disabled={dayStarted}
            className="centerBtn"
            variant="icon-dark"
            onClick={() => {
              confirmAlert({
                title: 'Confirmation',
                message: 'Êtes-vous sûr.e de vouloir de vouloir réinitialiser la feuille de tâches?',
                buttons: [{
                  label: 'Oui',
                  onClick: () => {
                    resetTasksByCat();
                  }
                }, {
                  label: 'Annuler',
                  onClick: () => { }
                }]
              });
            }}
          >
            <FontAwesomeIcon
              className="iconRefresh"
              icon={faArrowRotateLeft}
              size="lg"
            />
            <span>Commencer la journée</span>
          </Button>
        )}

        {taskCategory === 2 && (
          <Button
            disabled={(today.getDay() !== 1 || dayStarted) && (role !== "1" && role !== "4")}
            className="centerBtn"
            variant="icon-dark"
            onClick={() => {
              confirmAlert({
                title: 'Confirmation',
                message: 'Êtes-vous sûr.e de vouloir de vouloir réinitialiser la feuille de tâches?',
                buttons: [{
                  label: 'Oui',
                  onClick: () => {
                    resetTasksByCat();
                  }
                }, {
                  label: 'Annuler',
                  onClick: () => { }
                }]
              });
            }}
          >
            <FontAwesomeIcon
              className="iconRefresh"
              icon={faArrowRotateLeft}
              size="lg"
            />
            <span>Commencer la semaine</span>
          </Button>
        )}

        {taskCategory === 3 && (
          <Button
            className="centerBtn"
            variant="icon-dark"
            onClick={() => {
              confirmAlert({
                title: 'Confirmation',
                message: 'Êtes-vous sûr.e de vouloir de vouloir réinitialiser la feuille de tâches?',
                buttons: [{
                  label: 'Oui',
                  onClick: () => {
                    resetTasksByCat();
                  }
                }, {
                  label: 'Annuler',
                  onClick: () => { }
                }]
              });
            }}
          >
            <FontAwesomeIcon
              className="iconRefresh"
              icon={faArrowRotateLeft}
              size="lg"
            />
            <span>Réinitialiser</span>
          </Button>
        )}

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
      </div>

      <div className="taskDisplayList mt-3">
        {taskCategory === 1 && <DailyTaskDisplay
          listTask={accountTask}
          allCatTask={allCatTask}
          deleteSuccess={setDelete}
          editSuccess={setEdit}
          completedSuccess={setTaskCompleted}
        />}

        {taskCategory === 2 && <HebdoTaskDisplay
          listTask={accountTask}
          allCatTask={allCatTask}
          deleteSuccess={setDelete}
          editSuccess={setEdit}
          completedSuccess={setTaskCompleted}
        />}

        {taskCategory === 3 && <OtherTaskDisplay
          listTask={accountTask}
          allCatTask={allCatTask}
          deleteSuccess={setDelete}
          editSuccess={setEdit}
          completedSuccess={setTaskCompleted}
        />
        }
      </div>

      {(role === "1" || role === "4") && (
        <div className="btnBar">
          <Button onClick={() => setSeeHistory(true)} variant="icon-dark" className="centerBtn">
            <FontAwesomeIcon className="icon" icon={faClock} size="lg" />
            <span>Afficher l'historique</span>
          </Button>
        </div>
      )}
      <CreateTaskForm show={createTask} close={close} success={setSuccess} />
      <TaskHistoryModal show={seeHistory} close={close} newHistory={taskCompleted} />
    </section>
  );
}

export { TaskPage };
