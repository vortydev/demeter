import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { getAllNews, getNewsByRole } from "../../services/news.functions";
import { News } from "../../types/Types";
import { CreateNewsForm } from "./createNewsForm";
import { NewsPreview } from "./NewsPreview";

function NewsPage(): JSX.Element {
  const [createNews, setCreateNews] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [editedSuccess, setEditedSucess]= useState<boolean>(false);
  const [newsList, setNewsList] = useState<News[]>([]);
  const connected = getCookie("account") ? getCookie("account") : "Visiteur";
  const role = getCookie("role");

  useEffect(() => {
    async function getList() {
      if (role !== undefined) {
        setNewsList(await getNewsByRole(parseInt(role)));
      } else {
        setNewsList([]);
      }
    }
    getList();
  }, [createdSuccess, editedSuccess, deleteSuccess]);

  function success(): void {
    setSuccess(true);
    close();
  }

  function close(): void {
    setCreateNews(false);
  }

  async function showAllNews() {
    setNewsList(await getAllNews());

  }

  return (
    <div>
      <h1 className="pageTitle">Annonces</h1>
      {createdSuccess && <Alert>L'annonce à été créer avec succès!</Alert>}
      {editedSuccess && <Alert>L'annonce à été modifier avec succès!</Alert>}
      {deleteSuccess && <Alert>L'annonce à été supprimer avec succès!</Alert>}
      
      <p className="loginText">Vous êtes connecté en tant que {connected}</p>
      { role == "1" || role == "4" &&
        <div className="newsAdd mb-2">
        <Button onClick={showAllNews}>Afficher toutes les Annonces</Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            setCreateNews(true);
            setSuccess(false);
          }}
        >
          Nouvelle Annonce
        </Button>
      </div>
      }

      {newsList.length === 0 && <p>Aucune annonce présentement.</p> }
      {newsList.map((news) => (
        <NewsPreview news={news } editedSuccess={setEditedSucess} deleteSuccess={setDeleteSuccess}/>
      ))}
     
      <CreateNewsForm show={createNews} close={close} success={success} />
    </div>
  );
}

export { NewsPage };
