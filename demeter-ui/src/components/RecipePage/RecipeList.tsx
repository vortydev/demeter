import { useState } from "react";


interface RecipeListProps {
  filter: Number | null;
}

function RecipeList({ filter }: RecipeListProps) {

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

  const recipeList = [
    { id: 1, recipeName: "Pain aux bananes" },
    { id: 2, recipeName: "Pain au chocolat" },
    { id: 3, recipeName: "Croissant aux amandes" },
  ];

  return (
    <div className="recipeList">
      Liste de {filterSelected} ici !
      {recipeList.map((recipe) => (
        <span>
          {recipe.recipeName} 
        </span>
      ))}
    </div>
  );
}

export { RecipeList };
