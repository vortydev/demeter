import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { createRecipe } from "../../../services/Recipe.functions";
import { IngForRecipe } from "../../../types/RecipeTypes.types";
import { Recipe } from "../../../types/Types";
import { CreateRecipeForm } from "./createRecipeForm";
import { IngredientListForm } from "./IngredientSubForm/IngredientListForm";

interface CRPProps {
  setSelectedPage: (page: string) => void;
}

function CreateRecipePage({ setSelectedPage }: CRPProps) {
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
  const [created, setCreated] = useState<boolean>(false);

  async function handleSubmit() {
    console.log("recipeINfo", recipeInfo);
    setCreated(await createRecipe(recipeInfo, listIng));
  }

  return (
    <div className="createRecipePage">
        {created && <Alert>La recette à été créer avec succès!</Alert>}
      <CreateRecipeForm setRecipeInfo={setRecipeInfo} />
      <IngredientListForm listIng={listIng} setListIng={setListIng} />
      <Button onClick={handleSubmit}>CRÉER LA RECETTE</Button>
      <Button onClick={() => setSelectedPage("recipe")}>RETOUR</Button>
    </div>
  );
}

export { CreateRecipePage };
