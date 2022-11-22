import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getWeeklyHistory } from "../../../services/taskHistory.functions";
import { TaskHistory } from "../../../types/Types";

interface taskHistoryProps {
  show: boolean;
  newHistory: boolean;
  close: () => void;
}

function TaskHistoryModal({ show, newHistory, close }: taskHistoryProps) {
  const [history, setHistory] = useState<TaskHistory[]>([]);
  const [weekPrior, setWeekPrior] = useState<Date[]>([]);
  const [daysHistory, setDaysHistory]= useState<TaskHistory[]>([]);
  useEffect(() => {
    async function getList() {
      const today = new Date();
      const aWeekBefore = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      // requete qui get toute les taskHistory entre aWeekBefore & aujourd'hui : setHistory
      // filtre qui prends chaque date unique de history et les mets dans setWeekPrior


      setHistory(await getWeeklyHistory(aWeekBefore));
      setWeekPrior(history.map(task => task.completionDate).filter((value, index, self) => self.indexOf(value) === index));
      console.log(history.map(task => task.completionDate).filter((value, index, self) => self.indexOf(value) === index))

    }

    getList();
  }, [newHistory]);

  function setDay(day: Date){
   setDaysHistory(history.filter((t)=> t.completionDate === day ));

  }

  return (
    <Modal show={show} onClose={close}>
      <Modal.Title>HISTORIQUE</Modal.Title>
      <Modal.Body>
      {weekPrior.map((day) => (
        <span onClick={()=>setDay(day)}>{(new Date(day)).toLocaleDateString()}</span>
      ))}
      {daysHistory.length > 0 &&
      <div>
        {daysHistory.map((t)=>(<span>{t.taskName} par: {t.whoDid}</span>))}
      </div>}</Modal.Body>
      <Modal.Footer><Button onClick={close}>Terminer</Button></Modal.Footer>
    </Modal>
  );
}

export { TaskHistoryModal };
