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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

      <div className="singleRecipeTitle flex mt-2">
        <h2>{recipe!.title}</h2>
        <FontAwesomeIcon className="iconEdit cursor ml-2" icon={faEdit} size="lg" onClick={() => {
          setEditRecipe(true);
        }} />
      </div>
      <hr />

      <div className="pageSplit singleRecipeContent">
        <IngredientList list={listIng} />

        <div className="singleRecipeInterface">
          <h3>Calculateur</h3>
          <Calculator listIng={listIng} nbUnit={recipe!.nbUnitCreated} otherCost={recipe!.otherCost} />

          <div className="singleRecipeBtnBox flex mt-4">
            <Button variant="demeter-dark" onClick={() => setShowInstruction(true)}>
              Instructions
            </Button>

            <Button variant="danger" onClick={() => {
              confirmAlert({
                title: 'Confirmation',
                message: 'Êtes-vous sûr de vouloir supprimer cette recette?',
                buttons: [
                  {
                    label: 'Oui',
                    onClick: () => {
                      deleteRecipe(recipe!.id);
                      setRecipeDeleted(true);
                      setSelectedPage("recipe");
                    }
                  },
                  {
                    label: 'Non',
                    onClick: () => { }
                  }
                ]
              });
            }}>Supprimer</Button>
          </div>
        </div>
      </div>

      <div className="btnBar">
        <Button className="centerBtn flex" variant="icon-dark" onClick={() => setSelectedPage("recipe")}>
          <FontAwesomeIcon className="icon" icon={faArrowLeft} size="lg" />
          <span>Retour</span>
        </Button>
      </div>

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
