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
}

function TaskHistoryModal({ show, newHistory, close }: taskHistoryProps) {
  const [history, setHistory] = useState<TaskHistory[]>([]);
  const [weekPrior, setWeekPrior] = useState<Date[]>([]);
  const [daysHistory, setDaysHistory] = useState<TaskHistory[]>([]);

  async function getList() {
    const today = new Date();
    const aWeekBefore = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    // requete qui get toute les taskHistory entre aWeekBefore & aujourd'hui : setHistory
    // filtre qui prends chaque date unique de history et les mets dans setWeekPrior

    setHistory(await getWeeklyHistory(aWeekBefore));
    setWeekPrior(history.map(task => task.completionDate).filter((value, index, self) => self.indexOf(value) === index));

    // console.log(history.map(task => task.completionDate).filter((value, index, self) => self.indexOf(value) === index));
  }

  useEffect(() => {
    getList();
  }, [newHistory]);

  function setDay(day: Date) {
    setDaysHistory(history.filter((t) => t.completionDate === day));
  }

  return (
    <Modal show={show} onClose={close}>
      <div className="popupForm">
        <h3 className="popupTitle">Historique des tâches</h3>
        <p className="popupHint">Cliquer sur une date pour voir la complétion des tâches ce jour-là</p>

        <div className="hisDayList flex mt-3 mb-3">
          {weekPrior.map((day) => (
            <Button className="hisDayBtn" variant="demeter-dark" onClick={() => setDay(day)}>
              {(new Date(day)).toLocaleDateString()}
            </Button>
          ))}
        </div>

        {daysHistory.length > 0 &&
          <div className="hisTaskList">
            {daysHistory.map((t) => (<div>
              {t.parentId === 0 && <hr className="taskLine" />}
              <div className="hisTaskRow flex cellShade">
                {t.parentId !== 0 &&
                  <FontAwesomeIcon className="iconBullet mr-2" icon={faTurnUp} size="sm" />}
                <span className="hisTask">{t.taskName}</span>
                <span className="taskResponsable">{t.whoDid}</span>
              </div>
            </div>
            ))}
          </div>
        }

        <div className="popupBtnBox mt-3">
          <Button variant="demeter-dark" onClick={close}>Retour</Button>
        </div>
      </div>
    </Modal>
  );
}

export { TaskHistoryModal };
