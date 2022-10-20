import React from "react";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { News } from "../../types/Types";
import "../../css/news.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface NewsPreviewProps {
  news: News;
}

function NewsPreview({ news }: NewsPreviewProps) {
  let shortDescription = news.description;
  const [fullText, setFullText] = useState<boolean>(false);

  if (news.description.length > 200) {
    shortDescription = news.description.substring(0, 200);
  }

  const text = fullText ? news.description : shortDescription;
  const buttonText = fullText ? "Lire moins" : "Lire la suite";

  return (
    <div className="flexNewsPreview" >
      <h2 className="newsTitle">{news.title}</h2>
      <h3 className="newsDate">{news.date}</h3>
      <div className="flexNewsBox">
        {news.picture !== null && (<div className="picture"><img src={news.picture} /></div>)}
        <p className="newsContent"> {text}{<span><b>...</b></span>} </p>
        <div className="flexNewsEdit">
          <FontAwesomeIcon className="editIcon cursor" icon={faEdit} size="lg" onClick={() => {
            // TODO setEditNews(true); 
          }} />
          <FontAwesomeIcon className="trashIcon cursor" icon={faTrashAlt} size="lg" onClick={() => {
            // TODO deleteNews(currentNews.id);
            // TODO setDeleteSuccess(true);
          }} />
        </div>
      </div>
      <Button className="newsBtn" variant="demeter-dark" onClick={() => setFullText(!fullText)}>{buttonText}</Button>
      <hr className="newsLine" />
    </div>
  );
}

export { NewsPreview };
