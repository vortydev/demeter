import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getIngredientsByRecipe } from "../../../services/Ingredients.functions";
import { deleteRecipe } from "../../../services/recipe.functions";
import { Ingredient, Recipe } from "../../../types/Types";
import { Calculator } from "./Calculator";
import { EditRecipeForm } from "./EditRecipeForm/EditRecipeForm";
import { IngredientList } from "./IngredientList";
import { InstructionModal } from "./InstructionModal";

interface SingleRecipePageProps {
  recipe: Recipe | null;
  setSelectedPage: (page: string) => void;
  recipeDeleted: boolean;
  setRecipeDeleted: (deleted: boolean) => void;
}
//add setRecipe null on retour
function SingleRecipePage({
  recipe,
  setSelectedPage,
  recipeDeleted,
  setRecipeDeleted,
}: SingleRecipePageProps) {
  const [showInstruction, setShowInstruction] = useState<boolean>(false);
  const [listIng, setListIng] = useState<Ingredient[]>([]);
  const [listChanged, setChanged]=useState<boolean>(false);
  const [editRecipe, setEditRecipe] = useState<boolean>(false);

  useEffect(() => {
    async function getList() {
      setListIng(await getIngredientsByRecipe(recipe!.id));
    }
    setChanged(false);
    getList();
  }, [listChanged]);

  return (
    <div>
      {recipe!.title} <Button onClick={()=>{setEditRecipe(true);}}>EDIT</Button>
      <hr />
      <IngredientList list={listIng} />
      <Calculator listIng={listIng} nbUnit={recipe!.nbUnitCreated} />
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
      <EditRecipeForm show={editRecipe} setShow={setEditRecipe} recipe={recipe!} listIng={listIng} setChanged={setChanged}/>
    </div>
  );
}

export { SingleRecipePage };
