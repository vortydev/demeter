import React from "react";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { deleteNews } from "../../services/news.functions";
import { News } from "../../types/Types";
import { CreateNewsForm } from "./createNewsForm";
import { EditNewsForm } from "./EditNewsForm";
import "../../css/news.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";


interface NewsPreviewProps {
  news: News;
  deleteSuccess: (deleted: boolean) => void;
}

function NewsPreview({ news, deleteSuccess }: NewsPreviewProps) {
  let shortDescription = news.description;
  const [fullText, setFullText] = useState<boolean>(false);
  const [EditNews, setEditNews] = useState<boolean>(false);
  const [EditSuccess, setEditSuccess] = useState<boolean>(false);
  


  if (news.description.length > 200) {
    shortDescription = news.description.substring(0, 200);
  }
  else {
    shortDescription = news.description;
  }

  const text = fullText ? news.description : shortDescription;
  const buttonText = fullText ? "Lire moins" : "Lire la suite";
  const dotdotdot = fullText ? "" : " ...";
  const dateCreated = news.date.toDateString();

  function success(){
    setEditSuccess(true);
  }

  function close(){
    setEditNews(false)
  }

  return (
    <div className="flexNewsPreview" >
      <h2 className="newsTitle">{news.title}</h2>
      <h3 className="newsDate">{dateCreated}</h3>
      <div className="flexNewsBox">
        {news.picture !== null && (<div className="picture"><img src={news.picture} /></div>)}
        <p className="newsContent">{text}<b>{dotdotdot}</b></p>
        <div className="flexNewsEdit">
          <FontAwesomeIcon className="iconEdit cursor" icon={faEdit} size="lg" onClick={() => {
            console.log("EDIT NEWS");
            // TODO setEditNews(true); 
          }} />
          <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
            deleteNews(news.id);
            deleteSuccess(true);
          }} />
        </div>
      </div>
      <Button className="newsBtn" variant="link" onClick={() => setFullText(!fullText)}>{buttonText}</Button>
      <hr className="newsLine" />
    </div>
  );
}

export {  NewsPreview };

