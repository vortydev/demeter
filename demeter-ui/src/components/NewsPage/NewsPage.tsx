import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { getAllNews, getNewsByRole } from "../../services/news.functions";
import { News } from "../../types/Types";
import { CreateNewsForm } from "./createNewsForm";
import { NewsPreview } from "./NewsPreview";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye } from "@fortawesome/free-solid-svg-icons";

function NewsPage(): JSX.Element {
  const [createNews, setCreateNews] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [editedSuccess, setEditedSucess] = useState<boolean>(false);
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
    <section className="newsPage">
      <h1 className="pageTitle">Annonces</h1>
      {createdSuccess && <Alert variant="success">L'annonce à été créée avec succès!</Alert>}
      {editedSuccess && <Alert variant="success">L'annonce à été modifiée avec succès!</Alert>}
      {deleteSuccess && <Alert variant="success">L'annonce à été supprimée avec succès!</Alert>}

      <p className="loginText">Vous êtes connecté en tant que {connected}</p>
      {(role === "1" || role === "4") &&
        <div className="btnBar newsAdd mb-4">
          <Button variant="hidden">
            <FontAwesomeIcon className="icon" icon={faPlus} size="lg" />
            <span>Nouvelle Annonce</span>
          </Button>
          
          <Button variant="icon-dark" className="centerBtn" onClick={showAllNews}>
            <FontAwesomeIcon className="icon" icon={faEye} size="lg" />
            <span>Afficher toutes les Annonces</span>
          </Button>

          <Button variant="icon-outline" onClick={() => {
            setCreateNews(true);
            setSuccess(false);
          }}
          >
            <FontAwesomeIcon className="icon" icon={faPlus} size="lg" />
            <span>Nouvelle Annonce</span>
          </Button>
        </div>
      }

      {newsList.length === 0 && <p>Aucune annonce présentement.</p>}
      {newsList.map((news) => (
        <NewsPreview news={news} editedSuccess={setEditedSucess} deleteSuccess={setDeleteSuccess} />
      ))}

      <CreateNewsForm show={createNews} close={close} success={success} />
    </section>
  );
}

export { NewsPage };
