import { IngForRecipe } from "../../types/RecipeTypes.types";
import { Product } from "../../types/Types";


export function getRecipeCost(ingredients: IngForRecipe[]){
  console.log('in get Recipe Cost');
  let totalPrice = 0;
  for(let ingredient of ingredients){
    const price = pricePerQuantity(ingredient);
    totalPrice += price;
  }
  return totalPrice;
}

export function pricePerQuantity(ingredient: IngForRecipe): number {
  let result: number = 0;
  if (ingredient.ingredient.mesurementId == ingredient.mesurementId) {
    result = produitCroise(ingredient, ingredient.quantity);
  } else {
    let weightAdjustement = 0;
    switch (parseInt(ingredient.ingredient.mesurementId)) {
      case 1 || 3:
        weightAdjustement = ingredient.quantity * 1000;
        break;

      case 2 || 4:
        weightAdjustement = ingredient.quantity / 1000;
        break;

      default:
        //Do Nothing, this should not happen
        break;
    }
    result = produitCroise(ingredient, weightAdjustement);
  }

  return Math.round((result + Number.EPSILON) * 100) / 100;
}

function produitCroise(ingredient: IngForRecipe, actualQty: number) {
  return (
    (parseFloat(ingredient.ingredient.price) /
      parseFloat(ingredient.ingredient.qtyUnit)) *
    actualQty
  );
}


