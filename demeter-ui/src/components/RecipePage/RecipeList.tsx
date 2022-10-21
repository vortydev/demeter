import { useEffect, useState } from "react";
import { getRecipesByCategory } from "../../services/Recipe.functions";
import { Recipe } from "../../types/Types";


interface RecipeListProps {
  filter: number | null;
  setSelectedPage: (page:string) => void;
  setRecipePage: (recipe :Recipe)=> void; 
}

function RecipeList({ filter, setSelectedPage, setRecipePage }: RecipeListProps) {

  const [listRecipe, setListRecipe] = useState<Recipe[]>([]);

  useEffect(() => {
    async function getList() {
      setListRecipe(await getRecipesByCategory(filter));
    }
    getList();
  }, [filter]);



  function goToRecipePage(recipe : Recipe){
    setRecipePage(recipe)
    setSelectedPage("SingleRecipe");

  }

  return (
    <div className="recipeList">
      {listRecipe.map((recipe) => (
        <span onClick={()=>goToRecipePage(recipe)}>
          {recipe.title} 
        </span>
      ))}
    </div>
  );
}

export { RecipeList };
