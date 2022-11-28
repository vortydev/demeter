import { useEffect, useState } from "react";
import { getRecipesByCategory, getRecipesByCategoryName } from "../../services/recipe.functions";
import { Recipe } from "../../types/Types";



interface RecipeListProps {
  filter: number | null;
  selectedPage: string;
  deletedSuccess: boolean;
  setSelectedPage: (page: string) => void;
  setRecipePage: (recipe: Recipe) => void;
  nameFilter: string;
}

function RecipeList({ filter, selectedPage, deletedSuccess, setSelectedPage, setRecipePage, nameFilter }: RecipeListProps) {
  const [listRecipe, setListRecipe] = useState<Recipe[]>([]);

  useEffect(() => {

    async function getList() {
      if (nameFilter != ""){
        setListRecipe(await getRecipesByCategoryName(filter, nameFilter));
      } else {
        setListRecipe(await getRecipesByCategory(filter));
      }
    }
    getList();

  }, [filter, selectedPage, deletedSuccess, nameFilter]);



  function goToRecipePage(recipe: Recipe) {
    setRecipePage(recipe)
    setSelectedPage("SingleRecipe");

  }

  return (
    <div className="recipeList flex">
      {filter != null && listRecipe.length === 0 && (<p>Aucune recette</p>)}
      {filter === null && listRecipe.length === 0 && (<p>Aucune recette</p>)}
      {listRecipe.map((recipe) => (
        <span className="cursor cellShade" onClick={() => goToRecipePage(recipe)}>
          {recipe.title}
        </span>
      ))}
    </div>
  );
}

export { RecipeList };
