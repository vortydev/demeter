import { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faCircleNotch, faListCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

import { Account, Task, TaskHistory } from "../../types/Types";
import { TaskNav } from "./TaskNav";
import { CreateTaskForm } from "./createTaskForm";
import { DailyTaskDisplay } from "./TasksDisplay/DailyTaskDisplay";
import { HebdoTaskDisplay } from "./TasksDisplay/HebdoTaskDisplay";
import { TaskHistoryModal } from "./TaskHistory/TaskHistoryModal";

import { getAccountsByRole } from "../../services/account.functions";
import { getbyCategorie, resetTask } from "../../services/task.funtions";
import { createTaskHistory, ifTodayHistory } from "../../services/taskHistory.functions";
import { setCookiePage, getCookieTaskView, setCookieTaskView } from "../../services/cookie.functions";

interface TaskPageProp {
  role: string;
  account: string;
}

function TaskPage({ role, account }: TaskPageProp): JSX.Element {
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deletedSuccess, setDelete] = useState<boolean>(false);
  const [editedSuccess, setEdit] = useState<boolean>(false);
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const [createTask, setCreateTask] = useState<boolean>(false);
  const [seeHistory, setSeeHistory] = useState<boolean>(false);

  const [taskCategory, setTaskCategory] = useState<number>(1);  // Catégorie des tâches affichées
  const [viewedTasks, setViewedTasks] = useState<Task[]>([]);   // Tâches affichées pour l'utilisateur
  const [allCatTask, setAllCatTask] = useState<Task[]>([]);     // Toutes les tâches d'une catégorie
  const [dayStarted, setDayStarted] = useState<{ name: string, value: boolean}[]>([]);

  const [viewOptions, setViewOptions] = useState<{ name: string, value: string }[]>([]);
  const [accountView, setAccountView] = useState<String>("");
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Use buffers to avoid redundant calls
  const [accountBuffer, setAccountBuffer] = useState<Account[]>([]);

  // Fetches buffered accounts
  async function getBufferedAccounts() {
    if (accountBuffer.length > 0) {
      console.log("Using buffered accounts");
      return accountBuffer;
    }
    else {
      console.log("Loading account buffer...");
      const accounts = await getAccountsByRole(2);
      setAccountBuffer(accounts);
      return accounts;
    }
  }
  
  // Loads the account view menu
  function loadAccountView(accounts: Account[]) {
    // Add Succursale accounts to view menu options
    var viewOptions = accounts.map((employee: Account) => (
      { name: employee.accName, value: employee.accName }
    ));

    // Append delivery to view menu options
    viewOptions.push({ name: 'Livreurs', value: 'delivery' });
    setViewOptions(viewOptions);

    if (role === "2") {
      setAccountView(account);
    } 
    else if (role === "3") {
      setAccountView("delivery");
    }
    else if (role in ['1', '4']) {
      let acc = getCookieTaskView(accounts);
      setAccountView(acc);
    }
  }

  // Initializes the account buffer and view
  useEffect(() => {
    async function fetchData() {
      const loadedAccounts = await getBufferedAccounts();
      console.log("loaded accounts:", loadedAccounts);
      loadAccountView(loadedAccounts);
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Renders the list of tasks
  useEffect(() => {
    async function getList() {
      const categoryTasks: Task[] = await getbyCategorie(taskCategory); // Fetch all tasks of a category
      setAllCatTask(categoryTasks);
      setViewedTasks(categoryTasks.filter((t) => t.receiver === accountView));  // Filter tasks associated to the user
    }
    getList();
  }, [taskCategory, createdSuccess, deletedSuccess, editedSuccess, taskCompleted, accountView]);


  // Initialize dayStarted pairs
  useEffect(() => {
    const initializeDayStarted = async () => {
      if (dayStarted.length === 0) {
        const pairs = await Promise.all(viewOptions.map(async (account) => {
          const todayInHistory = await ifTodayHistory(date, taskCategory, account.value);
          return { name: account.value, value: todayInHistory };
        }));
        console.log("Pairs", pairs);
        setDayStarted(pairs);
      }
    };

    if (viewOptions.length > 0) {
      initializeDayStarted();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  async function resetTasksByCat() {
    setLoading(true);

    const accCatTasks = allCatTask.filter((t) => t.receiver === accountView)
    for (const task of accCatTasks) {
      await enterInHistory(task, date);
    }
    await resetTask(accCatTasks);
    setTaskCompleted(true);
    setTimeout(() => {
      setTaskCompleted(false);
    }, 100);

    setLoading(false);
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

  setCookiePage('task');

  return (
    <section className="appPage">
      {createdSuccess && <Alert variant="success">La tâche a été créée avec succès !</Alert>}
      {editedSuccess && <Alert variant="success">La tâche a été modifiée avec succès !</Alert>}
      {deletedSuccess && <Alert variant="success">La tâche a été supprimée avec succès !</Alert>}

      <TaskNav setTaskCategory={setTaskCategory} />

      {(role === "1" || role === "4") && <ButtonGroup id="viewMenu" className="mb-4">
        {viewOptions.map((radio, idx) => (
          <ToggleButton
            className={`
              ${accountView === radio.value ? "selected" : ""}
              ${"Centro" === radio.value ? "bleuViewBtn" : ""}
              ${"delivery" === radio.value ? "mauveViewBtn" : ""}
            `}
            variant="demeter"
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            name="radio"
            value={radio.value}
            checked={accountView === radio.value}
            onChange={(e) => {
              setAccountView(e.currentTarget.value);
              setCookieTaskView(e.currentTarget.value);
            }}
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
            // disabled={role !== "4" ? dayStarted.find(acc => acc.name === accountView)?.value : false}
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
            disabled={(today.getDay() !== 1 || dayStarted.find(acc => acc.name === accountView)?.value) && (role !== "1" && role !== "4")}
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

      {loading && <div className="mt-4">
					<p id="loading"><FontAwesomeIcon icon={faCircleNotch} spin />Chargement</p>
				</div>}

      <div className="taskDisplayList mt-3">
        {taskCategory === 1 && <DailyTaskDisplay
          listTask={viewedTasks}
          allCatTask={allCatTask}
          deleteSuccess={setDelete}
          editSuccess={setEdit}
          completedSuccess={setTaskCompleted}
          role={role}
          accountBuffer={accountBuffer}
        />}

        {taskCategory === 2 && <HebdoTaskDisplay
          listTask={viewedTasks}
          allCatTask={allCatTask}
          deleteSuccess={setDelete}
          editSuccess={setEdit}
          completedSuccess={setTaskCompleted}
          role={role}
          accountBuffer={accountBuffer}
        />}

      </div>

      <CreateTaskForm show={createTask} close={close} success={setSuccess} accountBuffer={accountBuffer} />
      <TaskHistoryModal show={seeHistory} close={close} newHistory={taskCompleted} viewReceiver={accountView} />
    </section>
  );
}

export { TaskPage };
