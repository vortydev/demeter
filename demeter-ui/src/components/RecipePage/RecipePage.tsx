import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Recipe } from "../../types/Types";
import "../../css/recipe.css";
import { RecipeList } from "./RecipeList";
import { getCookie } from "typescript-cookie";
import { RecipeFilter } from "./RecipeFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface RecipePageProps {
  selectedPage: string;
  createdSuccess: boolean;
  deletedSuccess: boolean;
  setCreatedSuccess: (success: boolean) => void;
  setDeletedSuccess: (deleted: boolean) => void;
  setSelectedPage: (page: string) => void;
  setRecipePage: (recipe: Recipe | null) => void;
}

function RecipePage({
  selectedPage,
  createdSuccess,
  deletedSuccess,
  setSelectedPage,
  setCreatedSuccess,
  setDeletedSuccess,
  setRecipePage,
}: RecipePageProps): JSX.Element {
  const role = getCookie("role");
  const [filter, setFilter] = useState<number | null>(null);
  const [nameFilter, setNameFilter] = useState<string>("");

  useEffect(() => {
    switch (role) {
      case "5":
        setFilter(4);
        break;
      case "6":
        setFilter(1);
        break;
      case "7":
        setFilter(3);
        break;
      case "8":
        setFilter(2);
        break;
      default:
        setFilter(filter);
        break;
    }
  }, []);

  function closeAllAlerts() {
    setCreatedSuccess(false);
    setDeletedSuccess(false);
  }

  setTimeout(() => {
    closeAllAlerts();
  }, 5000);

  return (
    <section className="appPage">
      {createdSuccess && (
        <Alert variant="success">La recette à été créée avec succès!</Alert>
      )}
      {deletedSuccess && (
        <Alert variant="success">La recette à été suprimée avec succès!</Alert>
      )}

      <div className="recipeContent flex mt-5">
        <div className="recipeListBox">
          <div className="filterBar mb-2">
            <RecipeFilter setName={setNameFilter} />
            <Button
              className="ml-3"
              variant="icon-dark"
              onClick={() => {
                setSelectedPage("CreateRecipe");
                closeAllAlerts();
              }}
            >
              <FontAwesomeIcon className="icon" icon={faPlus} size="lg" />
              <span>Nouvelle Recette</span>
            </Button>
          </div>

          <RecipeList
            filter={filter}
            selectedPage={selectedPage}
            deletedSuccess={deletedSuccess}
            setSelectedPage={setSelectedPage}
            setRecipePage={setRecipePage}
            nameFilter={nameFilter}
          />
        </div>

        {(role === "1" || role === "4") && (
          <div className="filterBox">
            <Button
              variant="secondary"
              onClick={() => {
                setFilter(null);
                closeAllAlerts();
              }}
            >
              Tous
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                setFilter(1);
                closeAllAlerts();
              }}
            >
              Boulangerie
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                setFilter(2);
                closeAllAlerts();
              }}
            >
              Pâtisserie
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                setFilter(3);
                closeAllAlerts();
              }}
            >
              Viennoiserie
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                setFilter(4);
                closeAllAlerts();
              }}
            >
              Cuisine
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export { RecipePage };
