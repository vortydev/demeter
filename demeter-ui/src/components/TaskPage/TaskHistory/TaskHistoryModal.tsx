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
  const [daysHistory, setDaysHistory] = useState<TaskHistory[]>([]);
  const [weekPrior, setWeekPrior] = useState<Date[]>([]);

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
    if (daysHistory.length === 0) {
      setDaysHistory(history.filter((t) => (t.completionDate === day && t.receiver === viewReceiver)));
    } else {
      setDaysHistory([]);
    }
  }

  var receiverName = viewReceiver === "delivery" ? "Livreurs" : viewReceiver;
  var receiverColor = viewReceiver === "delivery" ? "purpleText" : (viewReceiver === "Centro" ? "blueText" : "greenText");

  return (
    <Modal show={show} onClose={close}>
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

        {daysHistory.length > 0 && (
          <div className="hisTaskList">
            {daysHistory.map((t) => (
              <div>
                {t.parentId === 0 && <hr className="taskLine" />}
                <div className="hisTaskRow flex cellShade">
                  {t.parentId !== 0 && (
                    <FontAwesomeIcon
                      className="iconBullet mr-2"
                      icon={faTurnUp}
                      size="sm"
                    />
                  )}
                  <span className="hisTask">{t.taskName}</span>
                  <span className="taskResponsable">{t.whoDid}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="popupBtnBox mt-3">
          <Button
            variant="demeter-dark"
            onClick={() => {
              setDaysHistory([]);
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
