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
}

function NewsPreview({ news }: NewsPreviewProps) {
  let shortDescription = news.description;
  const [fullText, setFullText] = useState<boolean>(false);
  const [EditNews, setEditNews] = useState<boolean>(false);
  const [EditSuccess, setEditSuccess] = useState<boolean>(false);
  

<<<<<<< HEAD
  if(news.description.length > 300 ){
    shortDescription = news.description.substring(0, 300);
  }
  
=======
  if (news.description.length > 200) {
    shortDescription = news.description.substring(0, 200);
  }
  else {
    shortDescription = news.description;
  }

>>>>>>> origin/dev
  const text = fullText ? news.description : shortDescription;
  const buttonText = fullText ? "Lire moins" : "Lire la suite";
  const dotdotdot = fullText ? "" : " ...";

  function success(){
    setEditSuccess(true);
  }

  function close(){
    setEditNews(false)
  }

  return (
<<<<<<< HEAD
    <div className="newsPreview" >
      <div className="newsBox">
        {news.img !== null &&(<div className="picture">
          <img src={news.img} />
        </div>)}
        <p className="title-text">
          <h1>{news.title} </h1>
          {text}
        </p>
        <div className="edit-delete">
        <Button onClick={() => setEditNews(true)}>edit</Button><Button onClick={() => deleteNews(news.title)}>delete</Button>
        </div>{" "}
      
      </div>
      <Button onClick={()=>setFullText(!fullText)}>{buttonText}</Button>
      <hr />
      <EditNewsForm show={EditNews} close={close} success={success}/>
=======
    <div className="flexNewsPreview" >
      <h2 className="newsTitle">{news.title}</h2>
      <h3 className="newsDate">{news.date}</h3>
      <div className="flexNewsBox">
        {news.picture !== null && (<div className="picture"><img src={news.picture} /></div>)}
        <p className="newsContent">{text}<b>{dotdotdot}</b></p>
        <div className="flexNewsEdit">
          <FontAwesomeIcon className="iconEdit cursor" icon={faEdit} size="lg" onClick={() => {
            // TODO setEditNews(true); 
          }} />
          <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
            // TODO deleteNews(currentNews.id);
            // TODO setDeleteSuccess(true);
          }} />
        </div>
      </div>
      <Button className="newsBtn" variant="link" onClick={() => setFullText(!fullText)}>{buttonText}</Button>
      <hr className="newsLine" />
>>>>>>> origin/dev
    </div>
  );
}

export {  NewsPreview };

