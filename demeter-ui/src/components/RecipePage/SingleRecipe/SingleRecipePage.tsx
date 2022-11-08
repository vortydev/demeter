import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { getIngredientsByRecipe } from "../../../services/Ingredients.functions";
import { deleteRecipe } from "../../../services/recipe.functions";
import { Ingredient, Recipe } from "../../../types/Types";
import { Calculator } from "./Calculator";
import { EditRecipeForm } from "./EditRecipeForm/EditRecipeForm";
import { IngredientList } from "./IngredientList";
import { InstructionModal } from "./InstructionModal";

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
    <div>
      {editSuccess && (
        <Alert variant="success">La recette à été modifiée avec succès !</Alert>
      )}
      {recipe!.title}{" "}
      <Button
        onClick={() => {
          setEditRecipe(true);
        }}
      >
        EDIT
      </Button>
      <hr />
      <IngredientList list={listIng} />
      <Calculator listIng={listIng} nbUnit={recipe!.nbUnitCreated} />
      <Button onClick={() => setShowInstruction(true)}>Instructions</Button>
      <Button
        onClick={() => {
          confirmAlert({
            title: 'Confirmation',
            message: 'Êtes-vous sur de vouloir supprimer cette recette?',
            buttons: [
              {
                label: 'Oui',
                onClick: () => {deleteRecipe(recipe!.id);
                  setRecipeDeleted(true);
                  setSelectedPage("recipe");}
              },
              {
                label: 'Non',
                onClick: () => {}
              }
            ]
          });
          
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
      <EditRecipeForm
        show={editRecipe}
        setShow={setEditRecipe}
        recipe={recipe!}
        setRecipe={setRecipe}
        listIng={listIng}
        setChanged={setChanged}
        editedSuccess={setEditSuccess}
      />
    </div>
  );
}

export { SingleRecipePage };
