import { useEffect, useState } from "react";
import { Task } from "../../../types/Types";
import { TaskRow } from "../TaskRow";

interface HebdoTaskProps {
  listTask: Task[];
  allCatTask: Task[];
  deleteSuccess: (deleted: boolean) => void;
  editSuccess: (edited: boolean) => void;
  completedSuccess: (completed: boolean) => void;
}

function HebdoTaskDisplay({ listTask, allCatTask, deleteSuccess, editSuccess, completedSuccess }: HebdoTaskProps) {
  const [listTaskMon, setLTMon] = useState<Task[]>([]);
  const [listTaskTue, setLTTue] = useState<Task[]>([]);
  const [listTaskWed, setLTWed] = useState<Task[]>([]);
  const [listTaskThu, setLTThu] = useState<Task[]>([]);
  const [listTaskFri, setLTFri] = useState<Task[]>([]);
  const [listTaskSat, setLTSat] = useState<Task[]>([]);
  const [listTaskSun, setLTSun] = useState<Task[]>([]);

  useEffect(() => {
    const noChildList = listTask.filter((t) => t.parentId == 0);
    setLTMon(listTask.filter(t => t.whenToDo === "mon"));
    setLTTue(listTask.filter(t => t.whenToDo === "tue"));
    setLTWed(listTask.filter(t => t.whenToDo === "wed"));
    setLTThu(listTask.filter(t => t.whenToDo === "thu"));
    setLTFri(listTask.filter(t => t.whenToDo === "fri"));
    setLTSat(listTask.filter(t => t.whenToDo === "sat"));
    setLTSun(listTask.filter(t => t.whenToDo === "sun"));

  }, [listTask]);

  return (<article className="taskDisplay">
    <h3>Lundi</h3>
    <hr className="taskLine" />
    <div className="taskRowList flex mb-4">
      {listTaskMon.map((Task) => (
        <TaskRow
          task={Task}
          listTask={allCatTask}
          deleteSuccess={deleteSuccess}
          editSuccess={editSuccess}
          completedSuccess={completedSuccess}
        />
      ))}
    </div>

    <h3>Mardi</h3>
    <hr className="taskLine" />
    <div className="taskRowList flex mb-4">
      {listTaskTue.map((Task) => (
        <TaskRow
          task={Task}
          listTask={allCatTask}
          deleteSuccess={deleteSuccess}
          editSuccess={editSuccess}
          completedSuccess={completedSuccess}
        />
      ))}
    </div>

    <h3>Mercredi</h3>
    <hr className="taskLine" />
    <div className="taskRowList flex mb-4">
      {listTaskWed.map((Task) => (
        <TaskRow
          task={Task}
          listTask={allCatTask}
          deleteSuccess={deleteSuccess}
          editSuccess={editSuccess}
          completedSuccess={completedSuccess}
        />
      ))}
    </div>

    <h3>Jeudi</h3>
    <hr className="taskLine" />
    <div className="taskRowList flex mb-4">
      {listTaskThu.map((Task) => (
        <TaskRow
          task={Task}
          listTask={allCatTask}
          deleteSuccess={deleteSuccess}
          editSuccess={editSuccess}
          completedSuccess={completedSuccess}
        />
      ))}
    </div>

    <h3>Vendredi</h3>
    <hr className="taskLine" />
    <div className="taskRowList flex mb-4">
      {listTaskFri.map((Task) => (
        <TaskRow
          task={Task}
          listTask={allCatTask}
          deleteSuccess={deleteSuccess}
          editSuccess={editSuccess}
          completedSuccess={completedSuccess}
        />
      ))}
    </div>

    <h3>Samedi</h3>
    <hr className="taskLine" />
    <div className="taskRowList flex mb-4">
      {listTaskSat.map((Task) => (
        <TaskRow
          task={Task}
          listTask={allCatTask}
          deleteSuccess={deleteSuccess}
          editSuccess={editSuccess}
          completedSuccess={completedSuccess}
        />
      ))}
    </div>

    <h3>Dimanche</h3>
    <hr className="taskLine" />
    <div className="taskRowList flex mb-4">
      {listTaskSun.map((Task) => (
        <TaskRow
          task={Task}
          listTask={allCatTask}
          deleteSuccess={deleteSuccess}
          editSuccess={editSuccess}
          completedSuccess={completedSuccess}
        />
      ))}
    </div>
  </article>)
}

export { HebdoTaskDisplay }