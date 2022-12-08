import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
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

function DailyTaskDisplay({
  listTask,
  allCatTask,
  deleteSuccess,
  editSuccess,
  completedSuccess,
  role,
}: DailyTaskProps) {
  const [listTaskOpen, setLTO] = useState<Task[]>([]);
  const [listTaskPreClose, setLTPC] = useState<Task[]>([]);
  const [listTaskClose, setLTC] = useState<Task[]>([]);

  useEffect(() => {
    const noChildList = listTask.filter((t) => t.parentId === 0);
    setLTO(noChildList.filter((t) => t.whenToDo === "open"));
    setLTPC(noChildList.filter((t) => t.whenToDo === "preClose"));
    setLTC(noChildList.filter((t) => t.whenToDo === "close"));
  }, [listTask]);

  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Ouverture </Accordion.Header>
        <Accordion.Body>
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
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
      <Accordion.Header>Pré-Fermeture</Accordion.Header>
      <Accordion.Body>
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
      </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
      <Accordion.Header>Fermeture</Accordion.Header>
      <Accordion.Body>
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
      </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export { DailyTaskDisplay };
