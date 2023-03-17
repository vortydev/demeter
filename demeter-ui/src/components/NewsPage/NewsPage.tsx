import { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import { PasswordModal } from "./passwordModal";
import { getAllNews, getNewsByRole } from "../../services/news.functions";
import { News, Account } from "../../types/Types";
import { CreateNewsForm } from "./createNewsForm";
import { NewsPreview } from "./NewsPreview";
import { getAccountsByRole } from "../../services/account.functions";

interface NewsPageProps{
  role: string;
  account: string;
}

function NewsPage({role, account}:NewsPageProps): JSX.Element {
  const [createNews, setCreateNews] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [editedSuccess, setEditedSucess] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [pwModal, setpwModal] = useState<boolean>(false);
  const [newsRole, setNewsRole] = useState<number>(1);
  const [receiver, setReceiver] = useState<{ name: string, value: string}[]>([]);
  const [chosenReceiver, setChosen] = useState<String>("");

  useEffect(() => {
    async function getList() {
      // if (role !== undefined) {
      //   setNewsList(await getNewsByRole(parseInt(role)));
      // } else {
      //   setNewsList([]);
      // }
      setNewsRole(parseInt(role));

      // display news by account role
      const newsByRole: News[] = await getNewsByRole(newsRole);
      setNewsList(newsByRole);

      // create a list of Succursale accounts
      const listAccount: Account[] = await getAccountsByRole(2);
      var accountOption = listAccount.map((account: Account) => (
        { name: account.accName, value: account.accName}
      ));

      // append les livreurs
      accountOption.push({ name: 'Livreur', value: 'delivery' });
      setReceiver(accountOption);
      
      // display news according to the role
      if (role === "2") {
        // filter news by succursale
        const newsForAccount: News[] = newsByRole.filter(
          (t) => t.receiver === account
        );
        setNewsList(newsForAccount);
      }
      else if (role === "3") {
        // display Livreur news
        setNewsList(newsByRole.filter((t) => t.receiver === "delivery"));
      }
      // else {
      //   // display news for the chosen receiver
      //   setNewsList(newsByRole.filter((t) => t.receiver === chosenReceiver));
      // }
    }
    getList();
  }, [createdSuccess, editedSuccess, deleteSuccess, role, chosenReceiver, newsRole, account]);

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

  // display all news
  async function showAllNews() {
    setNewsList(await getAllNews());
  }

  // sets the view for the according account
  async function setDefaultView() {
    // sets the chosen receiver on page load
    if (chosenReceiver === "" && !(role === "1" || role === "4")) {
      // get succursale accounts
      const listAccount: Account[] = await getAccountsByRole(2);
      if (listAccount.length > 0) {
        // set the view to the first account in the list
        setChosen(listAccount[0].accName);
      }
      else {
        // if no succursales, display delivery tasks
        setChosen("delivery");
      }
    }
  }
  setDefaultView();

  // open the password modal if the acc is succursale
  function checkPermission() {
    if (role === "2") {
      setpwModal(true);
    } else {
      setCreateNews(true);
    }
  }

  return (
    <section className="appPage">
      {createdSuccess && <Alert variant="success">L'annonce a été créée avec succès !</Alert>}
      {editedSuccess && <Alert variant="success">L'annonce a été modifiée avec succès !</Alert>}
      {deleteSuccess && <Alert variant="success">L'annonce a été supprimée avec succès !</Alert>}

      <p className="loginText mt-4 mb-3">Vous êtes connecté.e en tant que {account}</p>

      {/* {(role === "1" || role === "4") && <ButtonGroup className="taskView mb-4">
        {receiver.map((radio, idx) => (
          <ToggleButton
            className={`
              ${chosenReceiver === radio.value ? "selected" : ""}
              ${"Centro" === radio.value ? "bleuCentroTaskBtn" : ""}
              ${"delivery" === radio.value ? "mauveLivreurTaskBtn" : ""}
            `}
            variant="demeter"
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            name="radio"
            value={radio.value}
            checked={chosenReceiver === radio.value}
            onChange={(e) => setChosen(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>} */}

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
      {newsList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).reverse().map((news) => (
        <NewsPreview
          news={news}
          editedSuccess={setEditedSucess}
          deleteSuccess={setDeleteSuccess} editSuccess={false} role={role} />
      ))}

      <CreateNewsForm show={createNews} close={close} success={success} />
      <PasswordModal show={pwModal} close={close} setCreateNews={setCreateNews} />

    </section>
  );
}

export { NewsPage };
