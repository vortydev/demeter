import React from "react";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { deleteNews } from "../../services/news.functions";
import { News } from "../../types/Types";
import { CreateNewsForm } from "./createNewsForm";
import { EditNewsForm } from "./EditNewsForm";
import "./news.css";

interface NewsPreviewProps {
  news: News;
}

function NewsPreview({ news }: NewsPreviewProps) {
  let shortDescription = news.description;
  const [fullText, setFullText] = useState<boolean>(false);
  const [EditNews, setEditNews] = useState<boolean>(false);
  const [EditSuccess, setEditSuccess] = useState<boolean>(false);
  

  if(news.description.length > 300 ){
    shortDescription = news.description.substring(0, 300);
  }
  
  const text = fullText ? news.description : shortDescription;
  const buttonText = fullText ? "Lire moins" : "Lire la suite";

  function success(){
    setEditSuccess(true);
  }

  function close(){
    setEditNews(false)
  }

  return (
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
    </div>
  );
}

export {  NewsPreview };

