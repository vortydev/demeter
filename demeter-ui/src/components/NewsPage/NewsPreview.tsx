import { Alert, Button } from "react-bootstrap";
import { News } from "../../types/Types";
import "./news.css";

interface NewsPreviewProps {
  news: News;
}

function NewsPreview({ news }: NewsPreviewProps) {
  const shortDescription = news.description; // à modifier pour que se soit la version courte (X premiers mots )

  return (
    <Alert className="newsPreview" variant="light">
      <div className="newsBox">
        {news.picture !== null &&(<div className="picture">
          <img src={news.picture} />
        </div>)}
        <p className="title-text">
          <h1>{news.title} </h1>
          {shortDescription}
        </p>
        <div className="edit-delete">
          {" "}
          <Button >edit</Button>  <Button>delete</Button>
        </div>{" "}
      
      </div>
      <Button>Lire la suite</Button>
      <hr />
    </Alert>
  );
}

export { NewsPreview };
