import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getMesurementById } from "../../../../services/inventory.functions";
import { IngForRecipe } from "../../../../types/RecipeTypes.types";
import { Mesurement } from "../../../../types/Types";
import { pricePerQuantity } from "../../helper";

interface IRFProps {
  listIng: IngForRecipe[];
  ingredient: IngForRecipe;
}
function IngredientRowForm({listIng, ingredient}: IRFProps) {
  const [mesure, setMesure] = useState<Mesurement | undefined>(undefined);

  useEffect(() => {
    async function getList() {
      setMesure(await getMesurementById(ingredient.mesurementId));
    }
    getList();
  }, [ingredient, mesure]);

  function removeIngredient(){
    const index = listIng.findIndex(ing => {
      return ing.ingredient.id === ingredient.ingredient.id;
    });

    listIng.splice(index, 1);
  }

  const cost = pricePerQuantity(ingredient);
 
  return (
    <div>
      <span>{ingredient.ingredient.name}</span>
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
