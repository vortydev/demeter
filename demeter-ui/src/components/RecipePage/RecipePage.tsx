import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Recipe } from "../../types/Types";
import "./recipe.css";
import { RecipeList } from "./RecipeList";

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
  const [filter, setFilter] = useState<number | null>(null);

  function closeAllAlerts() {
    setCreatedSuccess(false);
    setDeletedSuccess(false);
  }

  return (
    <div className="RecipePage">
      {createdSuccess && <Alert variant="success">La recette à été créée avec succès!</Alert>}
      {deletedSuccess && <Alert variant="success">La recette à été suprimée avec succès!</Alert>}
      <div className="content">
        <div>
          <Button
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
            setSelectedPage={setSelectedPage}
            setRecipePage={setRecipePage}
          />
        </div>

        <div className="filterButtons">
          <Button
            onClick={() => {
              setFilter(null); closeAllAlerts();
            }}
            variant="secondary"
          >
            Tous
          </Button>
          <Button
            onClick={() => {
              setFilter(1); closeAllAlerts();
            }}
            variant="secondary"
          >
            Boulangerie
          </Button>
          <Button
            onClick={() => {
              setFilter(2); closeAllAlerts();
            }}
            variant="secondary"
          >
            Pâtisserie
          </Button>
          <Button
            onClick={() => {
              setFilter(3); closeAllAlerts();
            }}
            variant="secondary"
          >
            Viennoiserie
          </Button>
          <Button
            onClick={() => {
              setFilter(4); closeAllAlerts();
            }}
            variant="secondary"
          >
            Cuisine
          </Button>
        </div>
      </div>
    </div>
  );
}

export { RecipePage };
