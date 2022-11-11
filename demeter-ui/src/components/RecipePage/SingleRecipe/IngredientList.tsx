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
      <h3>Ingrédients</h3>
      <div className="ingListHeader flex mb-2">
        <span className="ingListCol">Nom</span>
        <span className="ingListColS">Quantité</span>
        <span className="ingListColS">Coût</span>
      </div>

      <div className="cellShade">
        {list.map((ing) => (
          <IngredientRow ingredient={ing} />
        ))}
      </div>
    </div>
  );
}

export { IngredientList };
