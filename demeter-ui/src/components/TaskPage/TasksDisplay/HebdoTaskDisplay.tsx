import { useEffect, useState } from "react";
import { Account, Task } from "../../../types/Types";
import { TaskRow } from "../TaskRow";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface HebdoTaskProps {
  listTask: Task[];
  allCatTask: Task[];
  deleteSuccess: (deleted: boolean) => void;
  editSuccess: (edited: boolean) => void;
  completedSuccess: (completed: boolean) => void;
  role: string;
  accountBuffer: Account[];
}

function HebdoTaskDisplay({ listTask, allCatTask, deleteSuccess, editSuccess, completedSuccess, role, accountBuffer }: HebdoTaskProps) {
  const [listTaskMon, setLTMon] = useState<Task[]>([]);
  const [listTaskTue, setLTTue] = useState<Task[]>([]);
  const [listTaskWed, setLTWed] = useState<Task[]>([]);
  const [listTaskThu, setLTThu] = useState<Task[]>([]);
  const [listTaskFri, setLTFri] = useState<Task[]>([]);
  const [listTaskSat, setLTSat] = useState<Task[]>([]);
  const [listTaskSun, setLTSun] = useState<Task[]>([]);

  useEffect(() => {
    const noChildList = listTask.filter((t) => t.parentId === 0);
    setLTMon(noChildList.filter((t) => t.whenToDo === "mon"));
    setLTTue(noChildList.filter((t) => t.whenToDo === "tue"));
    setLTWed(noChildList.filter((t) => t.whenToDo === "wed"));
    setLTThu(noChildList.filter((t) => t.whenToDo === "thu"));
    setLTFri(noChildList.filter((t) => t.whenToDo === "fri"));
    setLTSat(noChildList.filter((t) => t.whenToDo === "sat"));
    setLTSun(noChildList.filter((t) => t.whenToDo === "sun"));
  }, [listTask]);

  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <span>Lundi</span>
          <FontAwesomeIcon className="icon" icon={faAngleDown} size="lg" />
        </Accordion.Header>
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
                accountBuffer={accountBuffer}
              />
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <span>Mardi</span>
          <FontAwesomeIcon className="icon" icon={faAngleDown} size="lg" />
        </Accordion.Header>
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
                accountBuffer={accountBuffer}
              />
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>
          <span>Mercredi</span>
          <FontAwesomeIcon className="icon" icon={faAngleDown} size="lg" />
        </Accordion.Header>
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
                accountBuffer={accountBuffer}
              />
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>
          <span>Jeudi</span>
          <FontAwesomeIcon className="icon" icon={faAngleDown} size="lg" />
        </Accordion.Header>
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
                accountBuffer={accountBuffer}
              />
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="4">
        <Accordion.Header>
          <span>Vendredi</span>
          <FontAwesomeIcon className="icon" icon={faAngleDown} size="lg" />
        </Accordion.Header>
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
                accountBuffer={accountBuffer}
              />
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="5">
        <Accordion.Header>
          <span>Samedi</span>
          <FontAwesomeIcon className="icon" icon={faAngleDown} size="lg" />
        </Accordion.Header>
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
                accountBuffer={accountBuffer}
              />
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="6">
        <Accordion.Header>
          <span>Dimanche</span>
          <FontAwesomeIcon className="icon" icon={faAngleDown} size="lg" />
        </Accordion.Header>
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
                accountBuffer={accountBuffer}
              />
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export { HebdoTaskDisplay };
