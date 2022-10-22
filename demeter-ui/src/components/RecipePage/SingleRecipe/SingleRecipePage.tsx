import { useState } from "react";
import { Button } from "react-bootstrap";
import { deleteRecipe } from "../../../services/Recipe.functions";
import { Recipe } from "../../../types/Types";
import { InstructionModal } from "./InstructionModal";

interface SingleRecipePageProps {
  recipe: Recipe | null;
  setSelectedPage: (page: string) => void;
}
//add setRecipe null on retour
function SingleRecipePage({ recipe, setSelectedPage }: SingleRecipePageProps) {
  const [showInstruction, setShowInstruction] = useState<boolean>(false);

  async function handleDelete(){
    await deleteRecipe(recipe!.id);
    //add setdeletesuccess
    setSelectedPage("recipe");
  }

  return (
    <div>
      {recipe!.title}
      <Button onClick={()=>setShowInstruction(true)}>Instructions</Button>
      <Button onClick={handleDelete}>DELETE</Button>
      <Button onClick={() => setSelectedPage("recipe")} variant="dark"> 
        RETOUR
      </Button>
      <InstructionModal show={showInstruction} setShow={setShowInstruction} recipe={recipe!}/>
    </div>
  );
}

export {SingleRecipePage};
