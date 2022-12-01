import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { getAllNews, getNewsByRole } from "../../services/news.functions";
import { Account, News } from "../../types/Types";
import { CreateNewsForm } from "./createNewsForm";
import { NewsPreview } from "./NewsPreview";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import { PasswordModal } from "./passwordModal";
import { getCookieAccount } from "../../services/cookie.functions";

function NewsPage(): JSX.Element {
  const [createNews, setCreateNews] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [editedSuccess, setEditedSucess] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [pwModal, setpwModal] = useState<boolean>(false);
  var empty: Account = {accName: "Visiteur", accPassword: "", roleId: 0, stateId: 0};
  const [account, setAccount] = useState<Account>(empty);

  const role = getCookie("role");

  useEffect(() => {
    async function getList() {
      if (role !== undefined) {
        setNewsList(await getNewsByRole(parseInt(role)));
      } else {
        setNewsList([]);
      }
      setAccount(await getCookieAccount() || empty);
    }
    getList();
  }, [createdSuccess, editedSuccess, deleteSuccess, role]);

  function success(): void {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
    close();
  }

  function close(): void {
    setCreateNews(false);
    setpwModal(false);
  }

  async function showAllNews() {
    setNewsList(await getAllNews());
  }

  function checkPermission() {
    if (role === "2") {
      setpwModal(true);
    } else {
      setCreateNews(true);
    }
  }

  return (
    <section className="appPage">
      {createdSuccess && <Alert variant="success">L'annonce à été créée avec succès !</Alert>}
      {editedSuccess && <Alert variant="success">L'annonce à été modifiée avec succès !</Alert>}
      {deleteSuccess && <Alert variant="success">L'annonce à été supprimée avec succès !</Alert>}

      <p className="loginText mt-4 mb-3">Vous êtes connecté.e en tant que {account.accName}</p>

      {(role === "1" || role === "2" || role === "4") && (
        <div className="btnBar mb-4">
          <Button variant={`hidden ${role === "2" ? "hide" : ""}`}>
            <FontAwesomeIcon className="icon" icon={faPlus} size="lg" />
            <span>Nouvelle Annonce</span>
          </Button>
          {(role === "1" || role === "4") && (
            <Button
              variant="icon-dark"
              className="centerBtn"
              onClick={showAllNews}
            >
              <FontAwesomeIcon className="icon" icon={faList} size="lg" />
              <span>Afficher toutes les Annonces</span>
            </Button>
          )}

          <Button
            variant="icon-outline"
            onClick={() => {
              checkPermission();
              setSuccess(false);
            }}
          >
            <FontAwesomeIcon className="icon" icon={faPlus} size="lg" />
            <span>Nouvelle Annonce</span>
          </Button>
        </div>
      )}

      {newsList.length === 0 && <p>Aucune annonce présentement.</p>}
      {newsList.map((news) => (
        <NewsPreview
          news={news}
          editedSuccess={setEditedSucess}
          deleteSuccess={setDeleteSuccess} editSuccess={false} />
      ))}

      <CreateNewsForm show={createNews} close={close} success={success} />
      <PasswordModal show={pwModal} close={close} setCreateNews={setCreateNews} />

    </section>
  );
}

export { NewsPage };
