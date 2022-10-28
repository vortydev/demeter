import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { deleteRecipe } from "../../../services/Recipe.functions";
import { Recipe } from "../../../types/Types";
import { IngredientList } from "./IngredientList";
import { InstructionModal } from "./InstructionModal";

interface SingleRecipePageProps {
  recipe: Recipe | null;
  setSelectedPage: (page: string) => void;
  recipeDeleted : boolean;
  setRecipeDeleted: (deleted: boolean) => void;
}
//add setRecipe null on retour
function SingleRecipePage({ recipe, setSelectedPage, recipeDeleted, setRecipeDeleted }: SingleRecipePageProps) {
  const [showInstruction, setShowInstruction] = useState<boolean>(false);

  return (
    <div>
      {recipe!.title}
      <IngredientList recipeId={recipe!.id}/>
      <Button onClick={() => setShowInstruction(true)}>Instructions</Button>
      <Button
        onClick={() => {
          deleteRecipe(recipe!.id);
          setRecipeDeleted(true);
          setSelectedPage("recipe");
        }}
      >
        DELETE
      </Button>
      <Button onClick={() => setSelectedPage("recipe")} variant="dark">
        RETOUR
      </Button>
      <InstructionModal
        show={showInstruction}
        setShow={setShowInstruction}
        recipe={recipe!}
      />
    </div>
  );
}

export { SingleRecipePage };
