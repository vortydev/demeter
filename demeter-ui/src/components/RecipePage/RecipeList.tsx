import { useEffect, useState } from "react";
import { getRecipesByCategory } from "../../services/recipe.functions";
import { Recipe } from "../../types/Types";



interface RecipeListProps {
  filter: number | null;
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  setRecipePage: (recipe: Recipe) => void;
}

function RecipeList({ filter, selectedPage, setSelectedPage, setRecipePage }: RecipeListProps) {
  const [listRecipe, setListRecipe] = useState<Recipe[]>([]);

  useEffect(() => {

    async function getList() {
      setListRecipe(await getRecipesByCategory(filter));
    }
    getList();

  }, [filter, selectedPage]);



  function goToRecipePage(recipe: Recipe) {
    setRecipePage(recipe)
    setSelectedPage("SingleRecipe");

  }

  return (
    <div className="recipeList flex">
      {filter != null && listRecipe.length === 0 && (<p>Aucune recette</p>)}
      {filter === null && listRecipe.length === 0 && (<p>Aucune recette</p>)}
      {listRecipe.map((recipe) => (
        <span onClick={() => goToRecipePage(recipe)}>
          {recipe.title}
        </span>
      ))}
    </div>
  );
}

export { RecipeList };
