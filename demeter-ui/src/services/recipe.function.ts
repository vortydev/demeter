import { IngForRecipe } from "../types/RecipeTypes.types";
import { Ingredient, Recipe } from "../types/Types";
import {
  createIngredient,
  deleteIngredientsByRecipe,
} from "./Ingredients.functions";
import RecipeService from "./Recipe.services";

async function createRecipe(
  data: Recipe,
  listIng: IngForRecipe[]
): Promise<boolean> {
  const recipeCreated: Recipe | null = await RecipeService.create(data)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return null;
    });

  if (recipeCreated !== null) {
    console.log('about to create ingredient');
    for (let ing of listIng) {
      const ingToCreate: Ingredient = {
        recipeId: await recipeCreated.id,
        productId: ing.ingredient.id,
        qty: ing.quantity,
        mesurementId: parseInt(ing.mesurementId),
      };
      console.log('ingredient to create : ', ingToCreate, "in recipe :", recipeCreated.id);

      const ingCreated = await createIngredient(ingToCreate);
      if (!ingCreated) {
        console.log('the ingredient wasnt created.');
        return false;
        
      }
    }
    return true;
  }

  return false;
}

async function getRecipesByCategory(category: number | null) {
  if (category !== null) {
    const recipes = RecipeService.getByCategory(category)
      .then((response: any) => {
        return response.data;
      })
      .catch((e: Error) => {
        console.log(e);
        return [];
      });
    return recipes;
  } else {
    const recipes = RecipeService.getAll()
      .then((response) => {
        return response.data;
      })
      .catch((e: Error) => {
        console.log(e);
        return [];
      });
    return recipes;
  }
}

async function deleteRecipe(id: number) {
  console.log("in delete recipe");

  const deletedAllIngredients = deleteIngredientsByRecipe(id);
  console.log("all INg", deletedAllIngredients);

  const deleted = RecipeService.delete(id.toString())
    .then((response: any) => {
      console.log("the recipe was deleted");
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });

    console.log("compare",await deleted && deletedAllIngredients);
  return await deleted && deletedAllIngredients;
}

export { createRecipe, getRecipesByCategory, deleteRecipe };
