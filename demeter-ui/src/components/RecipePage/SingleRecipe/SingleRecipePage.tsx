import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getIngredientsByRecipe } from "../../../services/Ingredients.functions";
import { deleteRecipe } from "../../../services/recipe.functions";
import { Ingredient, Recipe } from "../../../types/Types";
import { Calculator } from "./Calculator";
import { EditRecipeForm } from "./EditRecipeForm/EditRecipeForm";
import { IngredientList } from "./IngredientList";
import { InstructionModal } from "./InstructionModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface SingleRecipePageProps {
  recipe: Recipe | null;
  setRecipe: (recipe: Recipe | null) => void;
  setSelectedPage: (page: string) => void;
  setRecipeDeleted: (deleted: boolean) => void;
}
//add setRecipe null on retour
function SingleRecipePage({
  recipe,
  setRecipe,
  setSelectedPage,
  setRecipeDeleted,
}: SingleRecipePageProps) {
  const [showInstruction, setShowInstruction] = useState<boolean>(false);
  const [listIng, setListIng] = useState<Ingredient[]>([]);
  const [listChanged, setChanged] = useState<boolean>(false);
  const [editRecipe, setEditRecipe] = useState<boolean>(false);
  const [editSuccess, setEditSuccess] = useState<boolean>(false);

  useEffect(() => {
    async function getList() {
      setListIng(await getIngredientsByRecipe(recipe!.id));
    }
    setChanged(false);
    getList();
  }, [listChanged]);

  return (
    <section className="singleRecipePage">
      <h1 className="pageTitle">Vue d'une Recette</h1>
      {editSuccess && (<Alert variant="success">La recette à été modifiée avec succès !</Alert>)}

      <div className="singleRecipeTitle flex">
        <h2>{recipe!.title}</h2>
        <FontAwesomeIcon className="iconEdit cursor ml-2" icon={faEdit} size="lg" onClick={() => {
          setEditRecipe(true);
        }} />
      </div>
      <hr />
      
      <IngredientList list={listIng} />

      <Calculator listIng={listIng} nbUnit={recipe!.nbUnitCreated} />

      <Button variant="demeter-dark" onClick={() => setSelectedPage("recipe")}>
        Retour
      </Button>

      <Button variant="demeter-dark" onClick={() => setShowInstruction(true)}>Instructions</Button>
      
      <Button variant="danger" onClick={() => {
          deleteRecipe(recipe!.id);
          setRecipeDeleted(true);
          setSelectedPage("recipe");
        }}>Supprimer</Button>

      <InstructionModal
        show={showInstruction}
        setShow={setShowInstruction}
        recipe={recipe!}
      />
      <EditRecipeForm
        show={editRecipe}
        setShow={setEditRecipe}
        recipe={recipe!}
        setRecipe={setRecipe}
        listIng={listIng}
        setChanged={setChanged}
        editedSuccess={setEditSuccess}
      />
    </section>
  );
}

export { SingleRecipePage };
