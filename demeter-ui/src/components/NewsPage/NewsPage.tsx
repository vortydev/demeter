import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { CreateNewsForm } from "./createNewsForm";

function NewsPage(): JSX.Element {
  const [createNews, setCreateNews] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);

  function success(): void {
    setSuccess(true);
    close();
  }

  function close(): void {
    setCreateNews(false);
  }

  return (
    <div>
      {createdSuccess && <Alert>L'annonce à été créer avec succès!</Alert>}
      <h1>News Page</h1>
      <Button
        variant="secondary"
        onClick={() => {
          setCreateNews(true);
          setSuccess(false);
        }}
      >
        Nouvelle Annonce
      </Button>
      <CreateNewsForm show={createNews} close={close} success={success} />
    </div>
  );
}

export { NewsPage };
