import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Recipe } from "../../types/Types";
import "../../css/recipe.css";
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
    <div className="recipePage">
      <h1 className="pageTitle">Carnet de Recettes</h1>

      {createdSuccess && <Alert variant="success">La recette à été créée avec succès!</Alert>}
      {deletedSuccess && <Alert variant="success">La recette à été suprimée avec succès!</Alert>}

      <div className="recipeContent flex mt-3">
        <div className="recipeListBox">
          <Button className="mb-2" variant="demeter-dark" onClick={() => {
            setSelectedPage("CreateRecipe");
            closeAllAlerts();
          }}>Nouvelle Recette</Button>

          <RecipeList
            filter={filter}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            setRecipePage={setRecipePage}
          />
        </div>

        <div className="filterBox">
          <Button variant="secondary" onClick={() => {
            setFilter(null); closeAllAlerts();
          }}>Tous</Button>

          <Button variant="secondary" onClick={() => {
            setFilter(1); closeAllAlerts();
          }}>Boulangerie</Button>

          <Button variant="secondary" onClick={() => {
              setFilter(2); closeAllAlerts();
            }}>Pâtisserie</Button>

          <Button variant="secondary" onClick={() => {
              setFilter(3); closeAllAlerts();
            }}>Viennoiserie</Button>
          
          <Button variant="secondary" onClick={() => {
              setFilter(4); closeAllAlerts();
            }}>Cuisine</Button>
        </div>
      </div>
    </div>
  );
}

export { RecipePage };
