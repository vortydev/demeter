import { Alert, Button } from "react-bootstrap";
import { News } from "../../types/Types";

interface NewsPreviewProps {
  news: News;
}

function NewsPreview({ news }: NewsPreviewProps) {
  const shortDescription = news.description; // à modifier pour que se soit la version courte (X premiers mots )

  return (
    <Alert variant="light">
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
          <Button>edit</Button>
        </div>{" "}
        <Button>delete</Button>
      </div>
      <Button>Lire la suite</Button>
      <hr />
    </Alert>
  );
}

export { NewsPreview };
