import { useEffect, useState } from "react";
import { getMesurementById } from "../../../../services/inventory.functions";
import { IngForRecipe } from "../../../../types/RecipeTypes.types";
import { Mesurement } from "../../../../types/Types";
import { pricePerQuantity } from "../../helper";

interface IRFProps {
  ingredient: IngForRecipe;
}
function IngredientRowForm({ ingredient }: IRFProps) {
  const [mesure, setMesure] = useState<Mesurement | undefined>(undefined);
  useEffect(() => {
    async function getList() {
      setMesure(await getMesurementById(ingredient.mesurementId));
    }
    getList();
  }, [ingredient, mesure]);

  const cost = pricePerQuantity(ingredient);
  console.log("cost", cost);
  return (
    <div>
      <span>{ingredient.ingredient.name}</span>
      <span>
        {ingredient.quantity}
        {mesure?.mesurement}
      </span>
      <span>{cost}$</span>
    </div>
  );
}
export { IngredientRowForm };
