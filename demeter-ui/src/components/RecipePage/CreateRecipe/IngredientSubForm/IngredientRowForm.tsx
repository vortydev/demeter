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
  return (
    <div>
      {ingredient.ingredient.name}{ingredient.quantity}
      {mesure}{cost}$
    </div>
  );
}
export { IngredientRowForm };
