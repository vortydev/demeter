import { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { getbyCategorie, resetTask } from "../../services/task.funtions";
import { Account, Task, TaskHistory } from "../../types/Types";
import { CreateTaskForm } from "./createTaskForm";
import { TaskNav } from "./TaskNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faListCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import { DailyTaskDisplay } from "./TasksDisplay/DailyTaskDisplay";
import { HebdoTaskDisplay } from "./TasksDisplay/HebdoTaskDisplay";
import { OtherTaskDisplay } from "./TasksDisplay/OtherTaskDisplay";
import { createTaskHistory, ifTodayHistory } from "../../services/taskHistory.functions";
import { TaskHistoryModal } from "./TaskHistory/TaskHistoryModal";
import { getAccountsByRole } from "../../services/account.functions";
import { setCookiePage } from "../../services/cookie.functions";

interface TaskPageProp {
  role: string;
  account: string;
}

function TaskPage({ role, account }: TaskPageProp): JSX.Element {
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deletedSuccess, setDelete] = useState<boolean>(false);
  const [editedSuccess, setEdit] = useState<boolean>(false);
  const [taskCategory, setTaskCategory] = useState<number>(1);
  const [accountTask, setAccountTask] = useState<Task[]>([]);
  const [allCatTask, setAllCatTask] = useState<Task[]>([]);
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const [createTask, setCreateTask] = useState<boolean>(false);
  const [seeHistory, setSeeHistory] = useState<boolean>(false);
  const [dayStarted, setDayStarted] = useState<{ name: string, value: boolean}[]>([]);
  const [receiver, setReceiver] = useState<{ name: string, value: string }[]>([]);
  const [chosenReceiver, setChosen] = useState<String>("");
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // initialize dayStarted pairs
  useEffect(() => {
    const initializeDayStarted = async () => {
    const pairs = await Promise.all(receiver.map(async (account) => {
      const todayInHistory = await ifTodayHistory(date, taskCategory, account.value);
      return { name: account.value, value: todayInHistory };
    }));
    setDayStarted(pairs);
  };

  if (receiver.length > 0) {
    initializeDayStarted();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiver]);

  useEffect(() => {
    async function getList() {
      const taskByCat: Task[] = await getbyCategorie(taskCategory);
      setAllCatTask(taskByCat);

      // add Succursale accounts to view menu options
      const listAccount: Account[] = await getAccountsByRole(2);
      var accountOption = listAccount.map((employee: Account) => (
        { name: employee.accName, value: employee.accName }
      ));

      // append delivery by default to view menu options
      accountOption.push({ name: 'Livreurs', value: 'delivery' });
      setReceiver(accountOption);

      // filter tasks by account
      if (role === "2") {
        setChosen(account);
      } 
      else if (role === "3") {
        setChosen("delivery");
      } 
      
      setAccountTask(taskByCat.filter((t) => t.receiver === chosenReceiver));
    }
    getList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    taskCategory,
    createdSuccess,
    deletedSuccess,
    editedSuccess,
    taskCompleted,
    chosenReceiver,
  ]);

  async function resetTasksByCat() {
    const accCatTasks = allCatTask.filter((t) => t.receiver === chosenReceiver)
    for (const task of accCatTasks) {
      await enterInHistory(task, date);
    }
    await resetTask(accCatTasks);
    setTaskCompleted(true);
    setTimeout(() => {
      setTaskCompleted(false);
    }, 100);
  }

  function close(): void {
    setCreateTask(false);
    setSeeHistory(false);
  }

  // send the task to the history
  async function enterInHistory(task: Task, date: Date) {
    const historyInfo: TaskHistory = {
      completionDate: date,
      taskName: task.title,
      whoDid: task.responsable,
      parentId: task.parentId,
      categorytaskId: task.categorytaskId,
      receiver: task.receiver,
      ogTaskId: task.id,
      whenToDo: task.whenToDo,
    };

    if (!await createTaskHistory(historyInfo)) {
      console.error("failed to add to history");
    }
  }

  // set the default view to the first option of the view menu
  async function setDefaultView() {
    if (chosenReceiver === "" && (role === "1" || role === "4")) {
      const listAccount: Account[] = await getAccountsByRole(2);

      if (listAccount.length > 0) {
        setChosen(listAccount[0].accName);
      }
      else {
        setChosen("delivery");
      }
    }
  }
  setDefaultView();

  setCookiePage('task');

  return (
    <section className="appPage">
      {createdSuccess && <Alert variant="success">La tâche a été créée avec succès !</Alert>}
      {editedSuccess && <Alert variant="success">La tâche a été modifiée avec succès !</Alert>}
      {deletedSuccess && <Alert variant="success">La tâche a été supprimée avec succès !</Alert>}

      <TaskNav
        taskCategory={taskCategory}
        setTaskCategory={setTaskCategory}
        success={createdSuccess}
        setSuccess={setSuccess}
      />

      {(role === "1" || role === "4") && <ButtonGroup id="viewMenu" className="mb-4">
        {receiver.map((radio, idx) => (
          <ToggleButton
            className={`
              ${chosenReceiver === radio.value ? "selected" : ""}
              ${"Centro" === radio.value ? "bleuViewBtn" : ""}
              ${"delivery" === radio.value ? "mauveViewBtn" : ""}
            `}
            variant="demeter"
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            name="radio"
            value={radio.value}
            checked={chosenReceiver === radio.value}
            onChange={(e) => setChosen(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>}

      <div className="btnBar">
        {(role === "1" || role === "4") && (
          <Button onClick={() => setSeeHistory(true)} variant="icon-outline">
          <FontAwesomeIcon className="icon" icon={faListCheck} size="lg" />
            <span>Afficher l'historique</span>
          </Button>
        )}

        {taskCategory === 1 && (
          <Button
            disabled={role !== "4" ? dayStarted.find(acc => acc.name === chosenReceiver)?.value : false}
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
            disabled={(today.getDay() !== 1 || dayStarted.find(acc => acc.name === chosenReceiver)?.value) && (role !== "1" && role !== "4")}
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
          <Button variant="icon-outline" onClick={() => {
              setCreateTask(true);
              setSuccess(false);
            }}>
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
          role={role}
        />}

        {taskCategory === 2 && <HebdoTaskDisplay
          listTask={accountTask}
          allCatTask={allCatTask}
          deleteSuccess={setDelete}
          editSuccess={setEdit}
          completedSuccess={setTaskCompleted}
          role={role}
        />}

        {taskCategory === 3 && <OtherTaskDisplay
          listTask={accountTask}
          allCatTask={allCatTask}
          deleteSuccess={setDelete}
          editSuccess={setEdit}
          completedSuccess={setTaskCompleted}
          role={role}
        />
        }
      </div>

      <CreateTaskForm show={createTask} close={close} success={setSuccess} />
      <TaskHistoryModal show={seeHistory} close={close} newHistory={taskCompleted} viewReceiver={chosenReceiver} />
    </section>
  );
}

export { TaskPage };
