import { useEffect, useState } from "react";
import { getIngredientsByRecipe } from "../../../services/Ingredients.functions";
import { Ingredient } from "../../../types/Types";
import { IngredientRow } from "./IngredientRow";

interface ILProps {
  recipeId: number;
}

function IngredientList({ recipeId }: ILProps) {
  const [list, setList] = useState<Ingredient[]>([]);
  useEffect(() => {
    async function getList() {
      setList(await getIngredientsByRecipe(recipeId));
    }
    getList();
  }, []);

  return (
    <div className="IngList">
      <span>NOM | QUANTITÉ | PRIX</span>
      <div>
        {list.map((ing) => (
          <IngredientRow ingredient={ing}/>
        ))}
      </div>
    </div>
  );
}


export { IngredientList };
