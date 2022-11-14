import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { deleteTask, updateTask } from "../../services/task.funtions";
import { Task } from "../../types/Types";
import { EditTaskForm } from "../TaskPage/EditTaskForm";

import "../../css/task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faArrowRotateLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";

interface TaskRowProps {
  task: Task;
  listTask: Task[];
  deleteSuccess: (deleted: boolean) => void;
  editSuccess: (edited: boolean) => void;
  completedSuccess: (completed: boolean) => void;
}

function TaskRow({ task, listTask, deleteSuccess, editSuccess, completedSuccess, }: TaskRowProps) {
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
    }
  }

  async function completeSt(st: Task) {
    console.log("complete the dam st !", st);
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
      }
    }
  }

  function closeEditForm() {
    setEditForm(false);
  }

  return (
    <div className="taskRowBox">
      <div className="taskRow flex cellShade">
        {task.completed && <FontAwesomeIcon className="iconCheck cursor" icon={faCheck} size="lg" />}
        <span>{task.title}</span>
        {!task.completed && (
          <input
            onBlur={complete}
            type="text"
            id={task.id.toString()}
          />
        )}
        {task.completed && <span className="taskResponsable">{task.responsable}</span>}
        {task.completed && (
          <FontAwesomeIcon className="iconUndo" icon={faArrowRotateLeft} size="lg" onClick={() => {
            cancelComplete(task)
          }} />
        )}

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
              }
            },
            {
              label: 'Annuler',
              onClick: () => { }
            }]
          });
        }} />
      </div>

      <div className="taskChildBox">
        {subListTask.map((st) => (
          <div className="taskChildRow flex cellShade">
            {st.completed && <FontAwesomeIcon className="iconCheck cursor" icon={faCheck} size="lg" />}
            <span>{st.title}</span>
            {!st.completed && (
              <input
                className="responable"
                type="text"
                id={st.id.toString()}
                onBlur={() => completeSt(st)}
              />
            )}
            {st.completed && <span className="taskResponsable">{st.responsable}</span>}
            {st.completed && (
              <FontAwesomeIcon className="iconUndo" icon={faArrowRotateLeft} size="lg" onClick={() => {
                cancelComplete(st)
              }} />
            )}

            <FontAwesomeIcon className="iconEdit" icon={faEdit} size="lg" onClick={() => {
              setToEdit(st);
              setEditForm(true);
            }} />

            <FontAwesomeIcon className="iconTrash" icon={faTrashAlt} size="lg" onClick={() => {
              confirmAlert({
                title: 'Confirmation',
                message: 'Êtes-vous sûr.e de vouloir supprimer cette tâche?',
                buttons: [{
                  label: 'Supprimer',
                  onClick: () => {
                    deleteTask(st.id);
                    deleteSuccess(true);
                  }
                },
                {
                  label: 'Annuler',
                  onClick: () => { }
                }]
              });
            }} />
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
