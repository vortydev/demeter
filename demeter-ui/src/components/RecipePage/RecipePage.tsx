import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Recipe } from "../../types/Types";
import "../../css/recipe.css";
import { RecipeList } from "./RecipeList";
import { getCookie } from "typescript-cookie";

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
    <div className="recipePage">
      <h1 className="pageTitle">Carnet de Recettes</h1>

      {createdSuccess && (
        <Alert variant="success">La recette à été créée avec succès!</Alert>
      )}
      {deletedSuccess && (
        <Alert variant="success">La recette à été suprimée avec succès!</Alert>
      )}

      <div className="recipeContent flex mt-4">
        <div className="recipeListBox">
          <Button
            className="mb-2"
            variant="demeter-dark"
            onClick={() => {
              setSelectedPage("CreateRecipe");
              closeAllAlerts();
            }}
          >
            Nouvelle Recette
          </Button>

          <RecipeList
            filter={filter}
            selectedPage={selectedPage}
            deletedSuccess={deletedSuccess}
            setSelectedPage={setSelectedPage}
            setRecipePage={setRecipePage}
          />
        </div>
        {role === "1" && (
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
    </div>
  );
}

export { RecipePage };
