import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { createRecipe } from "../../../services/Recipe.functions";
import { IngForRecipe } from "../../../types/RecipeTypes.types";
import { Recipe } from "../../../types/Types";
import { getRecipeCost } from "../helper";
import { CreateRecipeForm } from "./createRecipeForm";
import { IngredientListForm } from "./IngredientSubForm/IngredientListForm";

interface CRPProps {
  setSelectedPage: (page: string) => void;
  setCreated: (created: boolean)=>void;
}

function CreateRecipePage({ setSelectedPage, setCreated }: CRPProps) {
  const emptyRecipe :Recipe = {
    id: 1,
    title: "change me",
    categoryrecipeId: 99,
    instruction: "Change me",
    otherCost: 0,
    nbUnitCreated: 0,
    available : false,
  };


  const [listIng, setListIng] = useState<IngForRecipe[]>([]);
  const [recipeInfo, setRecipeInfo] = useState<Recipe>(emptyRecipe);

  const totalCost = getRecipeCost(listIng) + recipeInfo.otherCost;

  async function handleSubmit() {
    setCreated(await createRecipe(recipeInfo, listIng));
    setSelectedPage("recipe");

  }
  
  return (

    
    <div className="createRecipePage">
      <CreateRecipeForm setRecipeInfo={setRecipeInfo} />
      <IngredientListForm listIng={listIng} setListIng={setListIng} />
      <span>Coût Total : {totalCost}$</span>
      <Button onClick={handleSubmit}>CRÉER LA RECETTE</Button>
      <Button onClick={() => setSelectedPage("recipe")}>RETOUR</Button>
    </div>
  );
}

export { CreateRecipePage };
