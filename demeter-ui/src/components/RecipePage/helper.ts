import { IngForRecipe } from "../../types/RecipeTypes.types";
import { Product } from "../../types/Types";

export function pricePerQuantity(ingredient: IngForRecipe): number {
  let result: number = 0;
  if (ingredient.ingredient.mesurementId === ingredient.mesurementId) {
    // Si toute en gramme
    result = parseFloat(ingredient.ingredient.price) / ingredient.quantity;
  } else {
    let weightAdjustement = 0;
    switch (ingredient.ingredient.mesurementId) {
      case "1" || "3": // Si produit en gramme ou mililitre
        weightAdjustement = ingredient.quantity / 1000;
        result =
          (weightAdjustement * parseFloat(ingredient.ingredient.price)) /
          parseFloat(ingredient.ingredient.qtyUnit);
          break;

      case "2" || "4" : // si produit en kilogramme ou litre
        weightAdjustement = ingredient.quantity * 1000;
        result =
          (weightAdjustement * parseFloat(ingredient.ingredient.price)) /
          parseFloat(ingredient.ingredient.qtyUnit);
          break;
    }
  }
  console.log(result);
  return result;
}
