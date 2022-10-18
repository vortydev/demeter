import React from "react";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { News } from "../../types/Types";
import "./news.css";

interface NewsPreviewProps {
  news: News;
}

function NewsPreview({ news }: NewsPreviewProps) {
  let shortDescription = news.description;
  const [fullText, setFullText] = useState<boolean>(false);

  if(news.description.length > 300 ){
    shortDescription = news.description.substring(0, 300);
}
  
  const text = fullText ? news.description : shortDescription;
  const buttonText = fullText ? "Lire moins" : "Lire la suite";

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
        <Button>edit</Button><Button>delete</Button>
        </div>{" "}
      
      </div>
      <Button onClick={()=>setFullText(!fullText)}>{buttonText}</Button>
      <hr />
    </div>
  );
}

export { NewsPreview };
