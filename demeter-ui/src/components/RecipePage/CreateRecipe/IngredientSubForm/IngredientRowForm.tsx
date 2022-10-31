import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getMesurementById } from "../../../../services/inventory.functions";
import { IngForRecipe } from "../../../../types/RecipeTypes.types";
import { Mesurement } from "../../../../types/Types";
import { pricePerQuantity } from "../../helper";

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
  }, [ingredient, mesure]);

  function removeIngredient() {
    console.log("clicked Removed");
    setDeleteIngredient(false);
      listIng.splice(index, 1);
      if(listIng.length === 0){
        listIng = [];
      }
      setDeleteIngredient(true);
  }

  const cost = pricePerQuantity(ingredient);

    return (
      <div>
        <span>{index}. {ingredient.ingredient.name}</span>
        <span>
          {ingredient.quantity}
          {mesure?.mesurement}
        </span>
        <span>{cost}$</span>
        <Button onClick={removeIngredient}>DELETE</Button>
      </div>
    );
  } 

export { IngredientRowForm };
