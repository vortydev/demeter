import { useEffect, useState } from "react";
import { Task } from "../../../types/Types";
import { TaskRow } from "../TaskRow";
import Accordion from "react-bootstrap/Accordion";

interface HebdoTaskProps {
  listTask: Task[];
  allCatTask: Task[];
  deleteSuccess: (deleted: boolean) => void;
  editSuccess: (edited: boolean) => void;
  completedSuccess: (completed: boolean) => void;
  role: string;
}

function HebdoTaskDisplay({
  listTask,
  allCatTask,
  deleteSuccess,
  editSuccess,
  completedSuccess,
  role,
}: HebdoTaskProps) {
  const [listTaskMon, setLTMon] = useState<Task[]>([]);
  const [listTaskTue, setLTTue] = useState<Task[]>([]);
  const [listTaskWed, setLTWed] = useState<Task[]>([]);
  const [listTaskThu, setLTThu] = useState<Task[]>([]);
  const [listTaskFri, setLTFri] = useState<Task[]>([]);
  const [listTaskSat, setLTSat] = useState<Task[]>([]);
  const [listTaskSun, setLTSun] = useState<Task[]>([]);

  useEffect(() => {
    const noChildList = listTask.filter((t) => t.parentId === 0);
    setLTMon(listTask.filter((t) => t.whenToDo === "mon"));
    setLTTue(listTask.filter((t) => t.whenToDo === "tue"));
    setLTWed(listTask.filter((t) => t.whenToDo === "wed"));
    setLTThu(listTask.filter((t) => t.whenToDo === "thu"));
    setLTFri(listTask.filter((t) => t.whenToDo === "fri"));
    setLTSat(listTask.filter((t) => t.whenToDo === "sat"));
    setLTSun(listTask.filter((t) => t.whenToDo === "sun"));
  }, [listTask]);

  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Lundi</Accordion.Header>
        <hr className="taskLine" />
        <Accordion.Body>
          <div className="taskRowList flex mb-4">
            {listTaskMon.map((Task) => (
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
        <Accordion.Header>Mardi</Accordion.Header>
        <hr className="taskLine" />
        <Accordion.Body>
          <div className="taskRowList flex mb-4">
            {listTaskTue.map((Task) => (
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
        <Accordion.Header>Mercredi</Accordion.Header>
        <hr className="taskLine" />
        <Accordion.Body>
          <div className="taskRowList flex mb-4">
            {listTaskWed.map((Task) => (
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
      <Accordion.Item eventKey="3">
        <Accordion.Header>Jeudi</Accordion.Header>
        <hr className="taskLine" />
        <Accordion.Body>
          <div className="taskRowList flex mb-4">
            {listTaskThu.map((Task) => (
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
      <Accordion.Item eventKey="4">
        <Accordion.Header>Vendredi</Accordion.Header>
        <hr className="taskLine" />
        <Accordion.Body>
          <div className="taskRowList flex mb-4">
            {listTaskFri.map((Task) => (
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
      <Accordion.Item eventKey="5">
        <Accordion.Header>Samedi</Accordion.Header>
        <hr className="taskLine" />
        <Accordion.Body>
          <div className="taskRowList flex mb-4">
            {listTaskSat.map((Task) => (
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
      </Accordion.Item>{" "}
      <Accordion.Item eventKey="6">
        <Accordion.Header>Dimanche</Accordion.Header>
        <hr className="taskLine" />
        <Accordion.Body>
          <div className="taskRowList flex mb-4">
            {listTaskSun.map((Task) => (
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

export { HebdoTaskDisplay };
