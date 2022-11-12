import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { deleteTask, updateTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";
import { EditTaskForm } from "../TaskPage/EditTaskForm";
import "./task.css";

interface TaskRowProps {
  task: Task;
  listTask: Task[];
  deleteSuccess: (deleted: boolean) => void;
  editSuccess: (edited: boolean) => void;
  completedSuccess: (completed: boolean) => void;
}

function TaskRow({ task, listTask, deleteSuccess, editSuccess, completedSuccess }: TaskRowProps) {
  const [editform, setEditForm] = useState<boolean>(false);
  const [toEdit, setToEdit] = useState<Task>(task);

  const subListTask = listTask.filter((t) => t.parentId === task.id);

  async function complete() {
    const initials = (document.getElementById(task.id.toString()) as HTMLInputElement)
      .value;
    if (initials !== "") {
      const completedTask: Task = {
        ...task,
        completed: true,
        responsable: initials,
      };

      if(await updateTask(completedTask)){
        completedSuccess(true);
      }
    }
  }

  async function completeSt(st : Task) {
    const initials = (document.getElementById(st.id.toString()) as HTMLInputElement).value;
    if (initials !== "") {
      const completedTask: Task = {
        ...st,
        completed: true,
        responsable: initials,
      };

      if(await updateTask(completedTask)){
        completedSuccess(true);
      }
    }
  }

  function closeEditForm() {
    setEditForm(false);
  }

  return (
    <div className="taskRow">

      {!task.completed &&  <input
        onBlur={complete}
        className="responable"
        type="text"
        id={task.id.toString()}
      />}
      {task.completed && <span>{task.responsable}</span>}
     {" "}
      {task.title}{" "}
      <Button
        onClick={() => {
          setToEdit(task);
          setEditForm(true);
        }}
      >
        edit
      </Button>{" "}
      <Button
        onClick={() => {
          deleteTask(task.id);
          deleteSuccess(true);
        }}
      >
        delete
      </Button>
      <div>
        {subListTask.map((st) => (
          <div>
            <input className="responable" type="text" id={st.id.toString()}  onBlur={()=>completeSt(st)}/> {st.title}{" "}
            <Button
              onClick={() => {
                setToEdit(st);
                setEditForm(true);
              }}
            >
              EDIT
            </Button>
            <Button
              onClick={() => {
                deleteTask(st.id);
                deleteSuccess(true);
              }}
            >
              DELETE
            </Button>
          </div>
        ))}
      </div>
      <EditTaskForm
        task={toEdit}
        show={editform}
        close={closeEditForm}
        success={editSuccess}
      />
    </div>
  );
}
export { TaskRow };
