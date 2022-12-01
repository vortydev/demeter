import { useEffect, useState } from "react";
import { getMesurementById } from "../../../../services/inventory.functions";
import { IngForRecipe } from "../../../../types/RecipeTypes.types";
import { Mesurement } from "../../../../types/Types";
import { pricePerQuantity } from "../../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";

interface IRFProps {
  listIng: IngForRecipe[];
  ingredient: IngForRecipe;
  setDeleteIngredient: (deleted: boolean) => void;
}
function IngredientRowForm({
  listIng,
  ingredient,
  setDeleteIngredient,
}: IRFProps) {
  const [mesure, setMesure] = useState<Mesurement | undefined>(undefined);

  const index = listIng.findIndex((ing) => {
    return ing.ingredient.id === ingredient.ingredient.id;
  });

  useEffect(() => {
    async function getList() {
      setMesure(await getMesurementById(ingredient.mesurementId));
    }
    getList();
  }, [ingredient]);

  function removeIngredient() {
    console.log("clicked Removed");
    setDeleteIngredient(false);
    listIng.splice(index, 1);
    if (listIng.length === 0) {
      listIng = [];
    }
    setDeleteIngredient(true);
  }

  const cost = pricePerQuantity(ingredient);

  return (
    <div className="ingListRow flex cellShade mb-2">
      <span className="ingListCol cellCenter">{ingredient.ingredient.name}</span>
      <span className="ingListColS cellCenter">{ingredient.quantity}{" "}{mesure?.mesurement}</span>
      <span className="ingListColS cellCenter">{cost}$</span>
      <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
        confirmAlert({
          title: 'Confirmation',
          message: 'Êtes-vous sur de vouloir supprimer cet ingrédient?',
          buttons: [
            {
              label: 'Oui',
              onClick: () => { removeIngredient() }
            },
            {
              label: 'Non',
              onClick: () => { }
            }
          ]
        });
      }} />
    </div>
  );
}

export { IngredientRowForm };
