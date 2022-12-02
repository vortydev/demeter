import { useState } from "react";
import { deleteTask, updateTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";
import { EditTaskForm } from "../TaskPage/EditTaskForm";
import "../../css/task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faArrowRotateLeft, faCheck, faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";

interface TaskRowProps {
  task: Task;
  listTask: Task[];
  deleteSuccess: (deleted: boolean) => void;
  editSuccess: (edited: boolean) => void;
  completedSuccess: (completed: boolean) => void;
  role: string;
}

function TaskRow({ task, listTask, deleteSuccess, editSuccess, completedSuccess, role }: TaskRowProps) {
  const [editform, setEditForm] = useState<boolean>(false);
  const [toEdit, setToEdit] = useState<Task>(task);

  const subListTask = listTask.filter((t) => t.parentId === task.id);

  async function complete() {
    const initials = (
      document.getElementById(task.id.toString()) as HTMLInputElement
    ).value;
    if (initials !== "") {
      const completedTask: Task = {
        ...task,
        completed: true,
        responsable: initials,
      };

      if (await updateTask(completedTask)) {
        completedSuccess(true);
        setTimeout(() => {
          completedSuccess(false)
        }, 50);
      }
    }
  }

  async function cancelComplete(t: Task) {
    const nvmTask: Task = {
      ...t,
      completed: false,
      responsable: "",
    };

    if (await updateTask(nvmTask)) {
      completedSuccess(true);
      setTimeout(() => {
        completedSuccess(false)
      }, 50);
    }
  }

  async function completeSt(st: Task) {
    const initials = (
      document.getElementById(st.id.toString()) as HTMLInputElement
    ).value;
    if (initials !== "") {
      const completedTask: Task = {
        ...st,
        completed: true,
        responsable: initials,
      };

      if (await updateTask(completedTask)) {
        completedSuccess(true);
        setTimeout(() => {
          completedSuccess(false)
        }, 50);
      }
    }
  }

  function closeEditForm() {
    setEditForm(false);
  }
  
  return (
    <article className="taskRowBox">
      <div className={`taskRow flex cellShade ${task.priority ? "priority" : ""}`}>
        <div className="flex taskName">
          {task.completed && <FontAwesomeIcon className="iconCheck" icon={faCheck} size="lg" />}
          <span>{task.title}</span>
          {task.taskMaster !== "" && <span className="taskMaster">({task.taskMaster})</span>}
        </div>

        <div className="taskInputBox flex">
          <div className="flex taskInput">
            {(!task.completed && subListTask.length === 0) && (
              <input
                className="taskMainInput"
                onBlur={complete}
                type="text"
                id={task.id.toString()}
              />
            )}

            {task.completed && <div className="flex">
              <span className="taskResponsable">{task.responsable}</span>
              <FontAwesomeIcon className="iconUndo cursor" icon={faArrowRotateLeft} size="lg" onClick={() => {
                cancelComplete(task);
              }} />
            </div>}

            {(role === "1" || role === "4") && <div className="taskEditBox">
              <FontAwesomeIcon className="iconEdit cursor" icon={faEdit} size="lg" onClick={() => {
                setToEdit(task);
                setEditForm(true);
              }} />
              <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
                confirmAlert({
                  title: 'Confirmation',
                  message: 'Êtes-vous sûr.e de vouloir supprimer cette tâche?',
                  buttons: [{
                    label: 'Supprimer',
                    onClick: () => {
                      deleteTask(task.id);
                      deleteSuccess(true);
                      setTimeout(() => {
                        deleteSuccess(false)
                      }, 5000);
                    }
                  },
                  {
                    label: 'Annuler',
                    onClick: () => { }
                  }]
                });
              }} />
            </div>}
          </div>
        </div>
        <span className="taskDesc">{task.description}</span>
      </div>

      <div className="taskChildBox">
        {subListTask.map((st) => (
          <div className={`taskChildRow flex cellShade ${st.priority ? "priority" : ""}`}>
            <div className="flex taskName">
              {!st.completed && <FontAwesomeIcon className="iconBullet mr-2 ml-1" icon={faTurnUp} size="sm" />}
              {st.completed && <FontAwesomeIcon className="iconCheck" icon={faCheck} size="lg" />}
              <span>{st.title}</span>
            </div>

            <div className="taskInputBox flex">
              <div className="taskInput flex">
                {!st.completed && (
                  <input
                    className="responable"
                    type="text"
                    id={st.id.toString()}
                    onBlur={() => completeSt(st)}
                  />
                )}

                {st.completed && <div className="flex">
                  <span className="taskResponsable">{st.responsable}</span>
                  <FontAwesomeIcon className="iconUndo cursor" icon={faArrowRotateLeft} size="lg" onClick={() => {
                    cancelComplete(st)
                  }} />
                </div>}
              </div>

              {(role === "1" || role === "4") && <div className="taskEditBox">
                <FontAwesomeIcon className="iconEdit cursor" icon={faEdit} size="lg" onClick={() => {
                  setToEdit(st);
                  setEditForm(true);
                }} />

                <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
                  confirmAlert({
                    title: 'Confirmation',
                    message: 'Êtes-vous sûr.e de vouloir supprimer cette tâche?',
                    buttons: [{
                      label: 'Supprimer',
                      onClick: () => {
                        deleteTask(st.id);
                        deleteSuccess(true);
                        setTimeout(() => {
                          deleteSuccess(false);
                        }, 5000);
                      }
                    },
                    {
                      label: 'Annuler',
                      onClick: () => { }
                    }]
                  });
                }} />
              </div >}
            </div>
          </div >
        ))
        }
      </div >
      <hr className="taskLine" />

      <EditTaskForm
        task={toEdit}
        show={editform}
        close={closeEditForm}
        success={editSuccess}
      />
    </article >
  );
}

export { TaskRow };
