import { IngForRecipe } from "../types/RecipeTypes.types";
import { Ingredient, Recipe } from "../types/Types";
import { createIngredient } from "./Ingredients.functions";
import RecipeService from "./Recipe.services";

async function createRecipe(
  data: Recipe,
  listIng: IngForRecipe[]
): Promise<boolean> {
    console.log("in create recipe");
  const recipeCreated: Recipe | null = await RecipeService.create(data)
    .then((response: any) => {
        console.log("no error, here is the response", response.data);
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      console.log("There was an error in create Recipe");
      return null;
    });

  if (recipeCreated !== null) {
    for (let ing of listIng) {
      const ingToCreate: Ingredient = {
        recipeId: await recipeCreated.id,
        productId: ing.ingredient.id,
        qty: ing.quantity,
        mesurementId: parseInt(ing.mesurementId),
      };

      const ingCreated = await createIngredient(ingToCreate);
      if (!ingCreated) {
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

export { createRecipe, getRecipesByCategory };
