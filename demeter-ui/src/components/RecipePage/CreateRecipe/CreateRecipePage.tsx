import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { createRecipe } from "../../../services/Recipe.functions";
import { IngForRecipe } from "../../../types/RecipeTypes.types";
import { Recipe } from "../../../types/Types";
import { getRecipeCost } from "../helper";
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

  const listIng :IngForRecipe[] =[];

   useEffect(() => {
    console.log('in use Effect stuff changed : ',listIng, recipeInfo.otherCost, totalCost );
    setTotalCost( getRecipeCost(listIng) + recipeInfo.otherCost);
    
  }, [listIng.length, recipeInfo.otherCost, totalCost]);
  
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
    <div className="createRecipePage">
      {invalid && (
        <Alert variant="danger">
          Informations invalides, la recette n'a pas été créée.
        </Alert>
      )}
      <CreateRecipeForm setRecipeInfo={setRecipeInfo} />
      <IngredientListForm listIng={listIng} />
      <span>Coût Total : {totalCost}$</span>
      <Button onClick={handleSubmit}>CRÉER LA RECETTE</Button>
      <Button onClick={() => setSelectedPage("recipe")}>RETOUR</Button>
    </div>
  );
}

export { CreateRecipePage };
