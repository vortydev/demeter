import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { CreateNewsForm } from "./createNewsForm";
import { NewsPreview } from "./NewsPreview";

function NewsPage(): JSX.Element {
  const [createNews, setCreateNews] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const connected = getCookie("account") ? getCookie("account") : "Visiteur";
  const fakeNews = {
    id: 4,
    title: "Testing tests",
    description: "Lorem Ipsum Dolosit Amet",
    author: "val",
    picture: null,
  };

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
      <p>Vous êtes connecté en tant que {connected}</p>
      <NewsPreview news={fakeNews} />
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
