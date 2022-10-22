import { Ingredient } from "../types/Types";
import IngredientService from "./Ingredients.service";

async function createIngredient(data: Ingredient): Promise<boolean> {
    const ingredientCreated = IngredientService.create(data)
      .then((response: any) => {
        return true;
      })
      .catch((e: Error) => {
        console.log(e);
        return false;
      });
    return ingredientCreated;
  }



  async function deleteIngredientsByRecipe(recipeId: number){
    const deleted = IngredientService.deleteFromRecipe(recipeId)
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return deleted;


  }
  export{createIngredient, deleteIngredientsByRecipe}