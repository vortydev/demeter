import { IngForRecipe } from "../../types/RecipeTypes.types";

export function getRecipeCost(ingredients: IngForRecipe[]) {
  let totalPrice = 0;
  for (let ingredient of ingredients) {
    const price = pricePerQuantity(ingredient);
    totalPrice += price;
  }
  return totalPrice;
}

export function pricePerQuantity(ingredient: IngForRecipe): number {
  let result: number = 0;

  const qtyForRecipe = parseInt(ingredient.mesurementId);
  const qtyOfProduct = parseInt(ingredient.ingredient.mesurementId);

  if (qtyForRecipe === qtyOfProduct) {
    result = produitCroise(ingredient, ingredient.quantity);
  } else {
    let weightAdjustement = 0;
    if (
      (qtyOfProduct === 1 || qtyOfProduct === 3) &&
      (qtyForRecipe === 2 || qtyForRecipe === 4)
    ) {
      // ml or g to L or kg
      weightAdjustement = ingredient.quantity * 1000;
    } else if (
      (qtyOfProduct === 2 || qtyOfProduct === 4) &&
      (qtyForRecipe === 1 || qtyForRecipe === 3)
    ) {
      // kg or L to g or ml
      weightAdjustement = ingredient.quantity / 1000;
    } else if (qtyForRecipe === 6) {
      if (qtyOfProduct === 1) {
        // g to lb
        weightAdjustement = ingredient.quantity * 1000 * 2.2;
      } else if (qtyOfProduct === 2) {
        // kg to lb
        weightAdjustement = ingredient.quantity * 2.2;
      }
    } else if (qtyOfProduct === 6) {
      if (qtyForRecipe === 1) {
        // lb to g
        weightAdjustement = ingredient.quantity / 1000 / 2.2;

      } else if (qtyForRecipe === 2) {
        // lb to kg
        weightAdjustement = ingredient.quantity / 2.2;
      }
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

export function adjustPrice(price: number) {
  var regex1 = new RegExp(/^[0-9]+$/);
  var regex2 = new RegExp(/[0-9]+[.][0-9]{1}/);

  var strPrice = (Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2).toString();

  if (regex1.test(strPrice)) {
    strPrice = strPrice.concat(".00");
  } else if (!regex2.test(strPrice)) {
    strPrice = strPrice.concat("0");
  }
  
  return strPrice;
}