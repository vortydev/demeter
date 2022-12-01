import { Ingredient } from "../types/Types";
import IngredientService from "./Ingredients.service";

async function createIngredient(data: Ingredient): Promise<boolean> {
  console.log('in create Inggredient in fucntion thing');
  const ingredientCreated = IngredientService.create(data)
    .then((response: any) => {
      console.log('it worked wiiiii');
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return ingredientCreated;
}

async function deleteAllIngredientsByRecipe(recipeId: number) {
  console.log("deleting ingredient");
  const deleted = IngredientService.deleteAllFromRecipe(recipeId)
    .then((response: any) => {
      console.log("deleted ing with success");
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return deleted;
}

async function deleteOneIngredientsByRecipe(recipeId: number, productId: number) {
  console.log("deleting One ingredient");
  const deleted = IngredientService.deleteOneFromRecipe(recipeId, productId)
    .then((response: any) => {
      console.log("deleted ing with success");
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return deleted;
}


async function getIngredientsByRecipe(recipeId: number) {
  const ingredients = IngredientService.getByRecipe(recipeId)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
  return ingredients;
}
export { createIngredient, deleteAllIngredientsByRecipe, deleteOneIngredientsByRecipe, getIngredientsByRecipe }