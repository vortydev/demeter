import { IngForRecipe } from "../types/RecipeTypes.types";
import { Ingredient, Recipe } from "../types/Types";
import {
  createIngredient,
  deleteAllIngredientsByRecipe,
} from "./Ingredients.functions";
import RecipeService from "./recipe.services";

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

async function getRecipesByCategoryName(category: number | null, research: string) {
  if (category !== null) {
    const recipes = RecipeService.getByCategoryName(category, research)
      .then((response: any) => {
        return response.data;
      })
      .catch((e: Error) => {
        console.log(e);
        return [];
      });
    return recipes;
  } else {
    const recipes = RecipeService.getByName(research)
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

  const deletedAllIngredients = deleteAllIngredientsByRecipe(id);
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

  console.log("compare", await deleted && deletedAllIngredients);
  return await deleted && deletedAllIngredients;
}

async function updateRecipe(id: number, recipe: Recipe) {
  const updated = RecipeService.update(recipe, id.toString())
    .then((response: any) => {
      return true;
    })
    .catch((e: Error) => {
      console.log(e);
      return false;
    });
  return updated;
}

export { createRecipe, getRecipesByCategory, deleteRecipe, updateRecipe, getRecipesByCategoryName };
