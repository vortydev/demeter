import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { TaskHistory } from "../../../types/Types";

interface taskHistoryProps {
  show: boolean;
}

function taskHistory({ show }: taskHistoryProps) {
  const today = new Date();
  const aWeekBefore = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const [history, setHistory] = useState<TaskHistory[]>([]);
  const [weekPrior, setweekPrior] = useState<Date[]>([]);
  const [daysHistory, setDaysHistory]= useState<TaskHistory[]>([]);
  useEffect(() => {
    async function getList() {
      // requete qui get toute les taskHistory entre aWeekBefore & aujourd'hui : setHistory
      // filtre qui prends chaque date unique de history et les mets dans setWeekPrior
    }

    getList();
  }, []);

  function setDay(day: Date){
   setDaysHistory(history.filter((t)=> t.completionDate === day ));

  }

  return (
    <Modal show={show}>
      {weekPrior.map((day) => (
        <span onClick={()=>setDay(day)}>{day.toLocaleDateString()}</span>
      ))}
      {daysHistory.length > 0 &&
      <div>
        {daysHistory.map((t)=>(<span>{t.taskName} par: {t.whoDid}</span>))}
      </div>}
    </Modal>
  );
}

export { taskHistory };
