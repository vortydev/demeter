import { createImportSpecifier } from "typescript";
import { IngForRecipe } from "../../types/RecipeTypes.types";
import { Product } from "../../types/Types";

export function pricePerQuantity(ingredient: IngForRecipe): number {
  console.log("ingredient", ingredient);
  console.log("mesurementID", ingredient.ingredient.mesurementId);

  let result: number = 0;
  if (ingredient.ingredient.mesurementId == ingredient.mesurementId) {
    console.log("same unit");
    // Si toute en gramme
    result =
      (parseFloat(ingredient.ingredient.price) /
        parseFloat(ingredient.ingredient.qtyUnit)) *
      ingredient.quantity;
    console.log(result);
  } else {
    console.log("not same unit");
    let weightAdjustement = 0;
    switch (parseInt(ingredient.ingredient.mesurementId)) {
      case 1 || 3: // Si produit en gramme ou mililitre
        console.log(" in case 1");
        weightAdjustement = ingredient.quantity * 1000;
        result =
          (parseFloat(ingredient.ingredient.price) /
            parseFloat(ingredient.ingredient.qtyUnit)) *
          weightAdjustement;

        break;

      case 2 || 4: // si produit en kilogramme ou litre
        console.log(" in case 2");
        weightAdjustement = ingredient.quantity / 1000;

        result =
          (parseFloat(ingredient.ingredient.price) /
            parseFloat(ingredient.ingredient.qtyUnit)) *
          weightAdjustement;
        break;

      default:
        console.log("in default");
        break;
    }
  }

  return Math.round((result + Number.EPSILON) * 100) / 100;
}
