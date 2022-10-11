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

  return <div>Liste de {filterSelected} ici !</div>;
}

export { RecipeList };
