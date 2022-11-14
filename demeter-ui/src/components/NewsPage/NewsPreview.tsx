import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { deleteNews } from "../../services/news.functions";
import { getTask } from "../../services/task.funtions";
import { News, Task } from "../../types/Types";
import { CreateNewsForm } from "./createNewsForm";
import { EditNewsForm } from "./EditNewsForm";
import "../../css/news.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { TaskRow } from "../TaskPage/TaskRow";
import { getCookie } from "typescript-cookie";

interface NewsPreviewProps {
  news: News;
  editedSuccess: (editedSuccess: boolean) => void;
  deleteSuccess: (deleted: boolean) => void;
}

function NewsPreview({ news, editedSuccess ,deleteSuccess }: NewsPreviewProps) {
  let shortDescription = news.description;
  const [fullText, setFullText] = useState<boolean>(false);
  const [EditNews, setEditNews] = useState<boolean>(false);
  const [task, setTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    async function getLinkedTask() {
      setTask(await getTask(news.taskId));
    }
    if (news.taskId !== 0) {
      getLinkedTask();
    }
  }, [task, fullText, editedSuccess]);

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
  }

  function close() {
    setEditNews(false);
  }

  function showDate() {
    console.log(task);
    console.log(news.taskId);
  }

  const role = getCookie("role");
  return (
    <div className="flexNewsPreview">
      <h2 className="newsTitle">{news.title}</h2>
      <h3 className="newsDate" onClick={showDate}>
        {theDate.toLocaleDateString()}
      </h3>
      <div className="flexNewsBox">
        {news.picture !== null && (
          <div className="picture">
            <img src={news.picture} />
          </div>
        )}
        <p className="newsContent">
          {text}
          <b>{dotdotdot}</b>
        </p>
        { role == "1" || role == "4" &&
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
                deleteNews(news.id);
                deleteSuccess(true);
              }}
            />
          </div>
        }
      </div>
      {task !== undefined && (
        <div>
          <input className="responable" type="text" /> {task.title}{" "}
          <Button>Compléter</Button>
        </div>
      )}
      <Button
        className="newsBtn"
        variant="link"
        onClick={() => setFullText(!fullText)}
      >
        {buttonText}
      </Button>
      <hr className="newsLine" /> 


      <EditNewsForm show={EditNews} news={news} task={task} close={close} success={success}/>
    </div>
  );
}

export { NewsPreview };
