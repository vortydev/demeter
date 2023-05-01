import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getWeeklyHistory } from "../../../services/taskHistory.functions";
import { TaskHistory } from "../../../types/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnUp } from "@fortawesome/free-solid-svg-icons";

interface taskHistoryProps {
  show: boolean;
  newHistory: boolean;
  close: () => void;
  viewReceiver: String;
}

function TaskHistoryModal({ show, newHistory, close, viewReceiver }: taskHistoryProps) {
  const [history, setHistory] = useState<TaskHistory[]>([]);
  const [weekPrior, setWeekPrior] = useState<Date[]>([]);
  const [dateTampon, setDateTampon] = useState<Date>();
  const [subTasks, setSubTasks] = useState<Record<number, TaskHistory[]>>({});
  const [displayedTasks, setDisplayedTasks] = useState<{ title: string, tasks: TaskHistory[] }[]>([]);

  async function getList() {
    const today = new Date();
    const aWeekBefore = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    // requete qui get toute les taskHistory entre aWeekBefore & aujourd'hui : setHistory
    // filtre qui prends chaque date unique de history et les mets dans setWeekPrior

    setHistory(await getWeeklyHistory(aWeekBefore));
    setWeekPrior(
      history
        .map((task) => task.completionDate)
        .filter((value, index, self) => self.indexOf(value) === index)
        .reverse()
    );
  }

  useEffect(() => {
    getList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, newHistory]);

  // toggle la liste de tâches de la journée
  function setDay(day: Date) {
    setDateTampon(day);
    if (displayedTasks.length === 0 || dateTampon !== day) {
    // SQL update taskhistories as th inner join tasks as t set th.ogTaskId = t.id where t.title = th.taskname;
    // SQL update taskhistories as th inner join tasks as t set th.whenToDo = t.whenToDo where t.title = th.taskname;
      const seenTasks = history.filter((t) => (t.completionDate === day && t.receiver === viewReceiver));

      // group sub-tasks with their parent
      const parentTasks = seenTasks.filter((t) => t.parentId === 0);
      const newSubTasks: Record<number, TaskHistory[]> = {};
      seenTasks.forEach((t) => {
        if (t.parentId !== 0) {
          const parentTaskId = t.parentId || 0;
          if (!newSubTasks[parentTaskId]) {
            newSubTasks[parentTaskId] = [];
          }
          newSubTasks[parentTaskId].push(t);
        }
      });
      // console.log("parent tasks", parentTasks);
      // console.log("subtasks", newSubTasks);

      // set subtasks
      setSubTasks(newSubTasks);

      // group by categories (1:Daily, 2:Hebdo, 3:Autre)
      const catTasks: Record<number, TaskHistory[]> = {}
      parentTasks.forEach((t) => {
        if (!catTasks[t.categorytaskId]) {
          catTasks[t.categorytaskId] = [];
        }
        catTasks[t.categorytaskId].push(t);
        
        const subtasks = newSubTasks[t.ogTaskId];
        // console.log("current substasks", subtasks);
        if (subtasks) {
          subtasks.forEach((st) => {
            catTasks[t.categorytaskId].push(st); // add subtask
          });
        }
      });
      // console.log("cat tasks", catTasks);

      // group by whenToDo (open, pre-close, close, day of the week)
      const whenTasks: { title: string, tasks: TaskHistory[] }[] = [];
      for (let categoryId in catTasks) {
        if (catTasks.hasOwnProperty(categoryId)) {
          const ct = catTasks[categoryId];
          let title: string;
          if (categoryId === "1") {
            title = "Quotidiennes";
            ct.sort((a, b) => {
              const order = ["open", "preClose", "close"];
              return order.indexOf(a.whenToDo) - order.indexOf(b.whenToDo);
            });
          } 
          else if (categoryId === "2") {
            title = "Hebdomadaires";
            ct.sort((a, b) => {
              const order = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
              return order.indexOf(a.whenToDo) - order.indexOf(b.whenToDo);
            });
          } 
          else {
            title = "Autres";
            ct.sort((a, b) => {
              return a.whenToDo.localeCompare(b.whenToDo);
            });
          }
          whenTasks.push({ title, tasks: ct });
        }
      }
      console.log("when tasks", whenTasks);

      // set displayed tasks
      setDisplayedTasks(whenTasks);
    } else {
      setDisplayedTasks([]);
    }
  }

  var receiverName = viewReceiver === "delivery" ? "Livreurs" : viewReceiver;
  var receiverColor = viewReceiver === "delivery" ? "purpleText" : (viewReceiver === "Centro" ? "blueText" : "greenText");

  return (
    <Modal show={show} onClose={close} >
      <div className="popupForm">
        <h3 className="popupTitle">Historique des tâches (<span className={`${receiverColor}`}>{receiverName}</span>)</h3>
        <p className="popupHint mb-3">
          Cliquer sur une date pour voir la complétion des tâches ce jour-là
        </p>

        <div className="hisDayList flex mb-2">
          {weekPrior.map((day) => ( 
            <Button
              className="hisDayBtn mb-2"
              variant="outline-dark"
              onClick={() => setDay(day)}
            >
              {new Date (new Date(day).getTime() -  1 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </Button>
          ))}
        </div>

        {displayedTasks.map((category) => (
        <div>
          <h4 className="">{category.title}</h4>
          {category.tasks.map((t) => (
            <div>
              {t.parentId === 0 && <hr className="taskLine" />}
              <div className={`hisTaskRow flex ${subTasks[t.ogTaskId] ? 'taskParent' : ''}`}>
                {t.parentId !== 0 && (
                  <FontAwesomeIcon
                    className="iconBullet mr-2"
                    icon={faTurnUp}
                    size="sm"
                  />
                )}
                <span className="hisTask">{t.taskName}</span>
                <span className={`taskResponsable ${subTasks[t.ogTaskId] ? 'taskParent' : ''}`}>{t.whoDid}</span>
              </div>
            </div>
          ))}
        </div>
      ))}


        <div className="popupBtnBox mt-3">
          <Button
            variant="demeter-dark"
            onClick={() => {
              setDisplayedTasks([]);
              close();
            }}
          >
            Retour
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export { TaskHistoryModal };
