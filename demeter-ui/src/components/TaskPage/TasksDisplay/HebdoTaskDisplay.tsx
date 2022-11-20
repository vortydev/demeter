import { useEffect, useState } from "react";
import { Task } from "../../../types/Types";
import { TaskRow } from "../TaskRow";

interface HebdoTaskProps{
    listTask : Task[];
    allCatTask : Task[];
    deleteSuccess: (deleted: boolean) => void;
    editSuccess: (edited: boolean) => void;
    completedSuccess: (completed: boolean) => void;
}

function HebdoTaskDisplay({listTask, allCatTask, deleteSuccess, editSuccess, completedSuccess}:HebdoTaskProps) {
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

    return(<div>
        <h2>Lundi</h2>
        <div className="taskRowList flex mt-4 mb-4">
        {
          listTaskMon.map((Task) => (
            <TaskRow
              task={Task}
              listTask={allCatTask}
              deleteSuccess={deleteSuccess}
              editSuccess={editSuccess}
              completedSuccess={completedSuccess}
            />
          ))}
      </div>
        <h2>Mardi</h2>
        {
          listTaskTue.map((Task) => (
            <TaskRow
              task={Task}
              listTask={allCatTask}
              deleteSuccess={deleteSuccess}
              editSuccess={editSuccess}
              completedSuccess={completedSuccess}
            />
          ))}
        <h2>Mercredi</h2>
        {
          listTaskWed.map((Task) => (
            <TaskRow
              task={Task}
              listTask={allCatTask}
              deleteSuccess={deleteSuccess}
              editSuccess={editSuccess}
              completedSuccess={completedSuccess}
            />
          ))}
           <h2>Jeudi</h2>
        {
          listTaskThu.map((Task) => (
            <TaskRow
              task={Task}
              listTask={allCatTask}
              deleteSuccess={deleteSuccess}
              editSuccess={editSuccess}
              completedSuccess={completedSuccess}
            />
          ))}
           <h2>Vendredi</h2>
        {
          listTaskFri.map((Task) => (
            <TaskRow
              task={Task}
              listTask={allCatTask}
              deleteSuccess={deleteSuccess}
              editSuccess={editSuccess}
              completedSuccess={completedSuccess}
            />
          ))}
           <h2>Samedi</h2>
        {
          listTaskSat.map((Task) => (
            <TaskRow
              task={Task}
              listTask={allCatTask}
              deleteSuccess={deleteSuccess}
              editSuccess={editSuccess}
              completedSuccess={completedSuccess}
            />
          ))} <h2>Dimanche</h2>
          {
            listTaskSun.map((Task) => (
              <TaskRow
                task={Task}
                listTask={allCatTask}
                deleteSuccess={deleteSuccess}
                editSuccess={editSuccess}
                completedSuccess={completedSuccess}
              />
            ))}
    </div>)
}

export {HebdoTaskDisplay}