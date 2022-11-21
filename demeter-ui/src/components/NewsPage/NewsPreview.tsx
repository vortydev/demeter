import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { deleteNews } from "../../services/news.functions";
import { getTask, updateTask } from "../../services/task.funtions";
import { News, Task } from "../../types/Types";
import { EditNewsForm } from "./EditNewsForm";
import "../../css/news.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faArrowRotateLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "typescript-cookie";
import { confirmAlert } from "react-confirm-alert";

interface NewsPreviewProps {
  news: News;
  editedSuccess: (editedSuccess: boolean) => void;
  deleteSuccess: (deleted: boolean) => void;
}

function NewsPreview({ news, editedSuccess, deleteSuccess }: NewsPreviewProps) {
  let shortDescription = news.description;
  const [fullText, setFullText] = useState<boolean>(false);
  const [EditNews, setEditNews] = useState<boolean>(false);
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [completedTask, setCompletedTask] = useState<boolean>(false);
  const [longDesc, setLongDesc] = useState<boolean>(true);

  useEffect(() => {
    async function getLinkedTask() {
      setTask(await getTask(news.taskId));
    }
    if (news.taskId !== 0) {
      getLinkedTask();
    }

    if (news.description.length > 200) {
      setLongDesc(true);
    }
    else {
      setLongDesc(false);
    }
  }, [task, fullText, editedSuccess, completedTask]);

  if (news.description.length > 200) {
    shortDescription = news.description.substring(0, 200);
  } else {
    shortDescription = news.description;
  }

  const theDate = new Date(news.date);
  const text = fullText ? news.description : shortDescription;
  const buttonText = fullText ? "Lire moins" : "Lire la suite";
  const dotdotdot = fullText ? "" : " ...";

  function success() {
    editedSuccess(true);
    setTimeout(() => {
      editedSuccess(false);
    }, 5000);
  }

  function close() {
    setEditNews(false);
  }

  async function completeTask() {
    const initials = (document.getElementById(task!.id.toString()) as HTMLInputElement)
      .value;
    if (initials !== "") {
      const completedTask: Task = {
        ...task!,
        completed: true,
        responsable: initials,
      };

      if (await updateTask(completedTask)) {
        setCompletedTask(true);
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
      setCompletedTask(true);
    }
  }

  const role = getCookie("role");
  return (
    <article className="flexNewsPreview">
      <div className={`newsBody ${news.priority ? "priority" : ""}`}>
        <h2 className="newsTitle">{news.title}</h2>
        <h3 className="newsDate">
          {theDate.toLocaleDateString()} - {news.author}
        </h3>
        <div className="flexNewsBox">
          {news.picture !== null && (
            <div className="picture">
              <img src={news.picture} />
            </div>
          )}
          <p className="newsContent">
            {text}
            <b>{longDesc && dotdotdot}</b>
          </p>
          {(role === "1" || role === "4") &&
            <div className="flexNewsEdit">
              <FontAwesomeIcon
                className="iconEdit cursor"
                icon={faEdit}
                size="lg"
                onClick={() => {
                  setEditNews(true);
                }}
              />
              <FontAwesomeIcon
                className="iconTrash cursor"
                icon={faTrashAlt}
                size="lg"
                onClick={() => {

                  confirmAlert({
                    title: 'Confirmation',
                    message: 'Êtes-vous sûr.e de vouloir supprimer cette annonce?',
                    buttons: [{
                      label: 'Supprimer',
                      onClick: () => {
                        deleteNews(news.id);
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
                }}
              />
            </div>
          }
        </div>

        {task !== undefined && <div className="newsTaskBox flex mt-2">
          {task.completed &&
            <FontAwesomeIcon className="iconCheck mr-1" icon={faCheck} size="lg" />
          }

          {!task.completed &&
            <label className="jointTaskPreview">(Tâche jointe)</label>
          }
          
          <span>{task.title}</span>

          {!task.completed &&
            <input className="ml-2" type="text" id={task.id.toString()} onBlur={completeTask} />
          }

          {task.completed && (
            <div className="flex ml-2">
              <span className="jointTaskPreview">{task.responsable}</span>
              <FontAwesomeIcon className="iconUndo cursor" icon={faArrowRotateLeft} size="lg" onClick={() => {
                cancelComplete(task);
              }} />
            </div>
          )}
        </div>}
        {longDesc && <Button
          className="newsBtn"
          variant="link"
          onClick={() => setFullText(!fullText)}
        >
          {buttonText}
        </Button>}
      </div>

      <hr className="newsLine" />

      <EditNewsForm show={EditNews} news={news} task={task} close={close} success={success} />
    </article>
  );
}

export { NewsPreview };
