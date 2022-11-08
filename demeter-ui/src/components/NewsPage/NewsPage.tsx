import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { News } from "../../types/Types";
import { CreateNewsForm } from "./createNewsForm";
import { NewsPreview } from "./NewsPreview";

function NewsPage(): JSX.Element {
  const [createNews, setCreateNews] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<News[]>([]);
  const connected = getCookie("account") ? getCookie("account") : "Visiteur";
  const role = getCookie("role") ? getCookie("role") : "4";
  
  
  useEffect(() => {
    async function getList() {
      setNewsList(await getNewsByRole(role));
    }
    getList();

  }, [currentRole, createSuccess, deleteSuccess]);


  function success(): void {
    setSuccess(true);
    close();
  }

  function close(): void {
    setCreateNews(false);
  }

  return (
    <div>
      <h1 className="pageTitle">Annonces</h1>
      {createdSuccess && <Alert>L'annonce à été créer avec succès!</Alert>}
      <p className="loginText">Vous êtes connecté en tant que {connected}</p>
      <div className="newsAdd mb-2">
        <Button variant="outline-dark" onClick={() => {
          setCreateNews(true);
          setSuccess(false);
        }}>Nouvelle Annonce</Button>
      </div>
      {newsList.map(news => (<NewsPreview news={news} />))}
      <CreateNewsForm show={createNews} close={close} success={success} />
    </div>
  );
}

export { NewsPage };
