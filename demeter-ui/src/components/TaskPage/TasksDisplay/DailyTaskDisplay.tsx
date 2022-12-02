import { useEffect, useState } from "react";
import { Task } from "../../../types/Types";
import { TaskRow } from "../TaskRow";

interface DailyTaskProps {
  listTask: Task[];
  allCatTask: Task[];
  deleteSuccess: (deleted: boolean) => void;
  editSuccess: (edited: boolean) => void;
  completedSuccess: (completed: boolean) => void;
  role: string;
}

function DailyTaskDisplay({ listTask, allCatTask, deleteSuccess, editSuccess, completedSuccess, role }: DailyTaskProps) {
  const [listTaskOpen, setLTO] = useState<Task[]>([]);
  const [listTaskPreClose, setLTPC] = useState<Task[]>([]);
  const [listTaskClose, setLTC] = useState<Task[]>([]);

  useEffect(() => {
    const noChildList = listTask.filter((t) => t.parentId === 0);
    setLTO(noChildList.filter(t => t.whenToDo === "open"));
    setLTPC(noChildList.filter(t => t.whenToDo === "preClose"));
    setLTC(noChildList.filter(t => t.whenToDo === "close"));

  }, [listTask]);

  return (
    <article className="taskDisplay">
      <h3>Ouverture</h3>
      <hr className="taskLine" />
      <div className="taskRowList flex mb-4">
        {listTaskOpen.map((Task) => (
          <TaskRow
            task={Task}
            listTask={allCatTask}
            deleteSuccess={deleteSuccess}
            editSuccess={editSuccess}
            completedSuccess={completedSuccess}
            role={role}
          />
        ))}
      </div>

      <h3>Pré-Fermeture</h3>
      <hr className="taskLine" />
      <div className="taskRowList flex mb-4">
        {listTaskPreClose.map((Task) => (
          <TaskRow
            task={Task}
            listTask={allCatTask}
            deleteSuccess={deleteSuccess}
            editSuccess={editSuccess}
            completedSuccess={completedSuccess}
            role={role}
          />
        ))}
      </div>

      <h3>Fermeture</h3>
      <hr className="taskLine" />
      <div className="taskRowList flex mb-4">
        {listTaskClose.map((Task) => (
          <TaskRow
            task={Task}
            listTask={allCatTask}
            deleteSuccess={deleteSuccess}
            editSuccess={editSuccess}
            completedSuccess={completedSuccess}
            role={role}
          />
        ))}
      </div>
    </article>
  );
}

export { DailyTaskDisplay }