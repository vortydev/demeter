import { isConditionalExpression } from "typescript";
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
    console.log("deleting infredient");
    const deleted = IngredientService.deleteFromRecipe(recipeId)
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
  export{createIngredient, deleteIngredientsByRecipe}