import { useEffect, useState } from "react";
import { getIngredientsByRecipe } from "../../../services/Ingredients.functions";
import { Ingredient } from "../../../types/Types";
import { IngredientRow } from "./IngredientRow";

interface ILProps {
  list: Ingredient[];
}

function IngredientList({ list }: ILProps) {

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
