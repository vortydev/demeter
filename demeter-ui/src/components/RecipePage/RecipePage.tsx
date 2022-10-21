import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Recipe } from "../../types/Types";
import { CreateRecipeForm } from "./CreateRecipe/createRecipeForm";
import './recipe.css';
import { RecipeList } from "./RecipeList";

interface RecipePageProps{
setSelectedPage : (page:string) => void;
setRecipePage : (recipe: Recipe | null) => void;

}
function RecipePage({ setSelectedPage, setRecipePage}:RecipePageProps): JSX.Element {
  const [createRecipe, setCreateRecipe] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [filter, setFilter] = useState<number | null>(null);
  return (
    <div className="RecipePage">
      {createdSuccess && <Alert>La recette à été créer avec succès!</Alert>}
      <div className="content">
        <div>
          <Button
            variant="dark"
            onClick={() => {
            setSelectedPage("CreateRecipe")
            }}
          >
            Nouvelle Recette
          </Button>
          <RecipeList filter={filter} setSelectedPage={setSelectedPage}  setRecipePage={setRecipePage}  />
        </div>

        <div className="filterButtons">
          <Button
            onClick={() => {
              setFilter(null);
            }}
            variant="secondary"
          >
            Tous
          </Button>
          <Button
            onClick={() => {
              setFilter(1);
            }}
            variant="secondary"
          >
            Boulangerie
          </Button>
          <Button
            onClick={() => {
              setFilter(2);
            }}
            variant="secondary"
          >
            Pâtisserie
          </Button>
          <Button
            onClick={() => {
              setFilter(3);
            }}
            variant="secondary"
          >
            Viennoiserie
          </Button>
          <Button
            onClick={() => {
              setFilter(4);
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
