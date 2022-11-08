import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { createRecipe } from "../../../services/recipe.functions";
import { IngForRecipe } from "../../../types/RecipeTypes.types";
import { Recipe } from "../../../types/Types";
import { CreateRecipeForm } from "./createRecipeForm";
import { IngredientListForm } from "./IngredientSubForm/IngredientListForm";

interface CRPProps {
  setSelectedPage: (page: string) => void;
  setCreated: (created: boolean) => void;
}

function CreateRecipePage({ setSelectedPage, setCreated }: CRPProps) {
  const emptyRecipe: Recipe = {
    id: 1,
    title: "change me",
    categoryrecipeId: 99,
    instruction: "Change me",
    otherCost: 0,
    nbUnitCreated: 0,
    available: false,
  };
  const [recipeInfo, setRecipeInfo] = useState<Recipe>(emptyRecipe);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [recipeCost, setRecipeCost] = useState<number>(0);
  const [listIng, setListIng] = useState<IngForRecipe[]>([]);


  useEffect(() => {
    setTotalCost(recipeCost + recipeInfo.otherCost);
  }, [recipeCost, recipeInfo.otherCost, totalCost]);

  async function handleSubmit() {
    setInvalid(false);
    if (await createRecipe(recipeInfo, listIng)) {
      setCreated(true);
      setSelectedPage("recipe");
    } else {
      setInvalid(true);
    }
  }

  return (
    <section className="createRecipePage">
      <h1 className="pageTitle">Nouvelle Recette</h1>
      {invalid && (<Alert variant="danger">Informations invalides, la recette n'a pas été créée.</Alert>)}
      <div className="pageSplit">
        <CreateRecipeForm setRecipeInfo={setRecipeInfo} />
        <IngredientListForm setRecipeCost={setRecipeCost} listIng={listIng} />
      </div>

      <span>Coût Total : {totalCost}$</span>

      <div className="popupBtnBox mt-3">
        <Button variant="demeter-dark" onClick={() => setSelectedPage("recipe")}>Annuler</Button>
        <Button variant="demeter" onClick={handleSubmit}>Confirmer</Button>
      </div>
    </section>
  );
}

export { CreateRecipePage };
