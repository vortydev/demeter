import { useState } from "react";
import { Recipe } from "../../types/Types";



interface RecipeListProps {
  filter: Number | null;
  setSelectedPage: (page:string) => void;
  setRecipePage: (recipe :Recipe)=> void; 
}

function RecipeList({ filter, setSelectedPage, setRecipePage }: RecipeListProps) {

  let filterSelected = "";
  switch (filter) {
    case null:
      filterSelected = "Toutes";
      break;
    case 0:
      filterSelected = "Boulangerie";
      break;
    case 1:
      filterSelected = "Pâtisserie";
      break;
    case 2:
      filterSelected = "Viennoiserie";
      break;
    case 3:
      filterSelected = "Cuisine";
      break;
  }



  function goToRecipePage(recipe : Recipe){
    setRecipePage(recipe)
    setSelectedPage("SingleRecipe");

  }

  const recipeList = [
    { id: 1, recipeName: "Pain aux bananes" },
    { id: 2, recipeName: "Pain au chocolat" },
    { id: 3, recipeName: "Croissant aux amandes" },
  ];

  return (
    <div className="recipeList">
      Liste de {filterSelected} ici !
      {recipeList.map((recipe) => (
        <span onClick={()=>goToRecipePage(recipe)}>
          {recipe.recipeName} 
        </span>
      ))}
    </div>
  );
}

export { RecipeList };
