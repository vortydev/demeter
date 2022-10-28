import { useState } from "react";
import { Button } from "react-bootstrap";
import { IngForRecipe } from "../../../../types/RecipeTypes.types";
import { AddIngredientForm } from "./AddIngredientForm";
import { IngredientRowForm } from "./IngredientRowForm";

interface ILFProps {
  listIng: IngForRecipe[];
}

function IngredientListForm({ listIng}: ILFProps) {
  const [addIngredient, setAddIngredient] = useState<boolean>(false);

  return (
    <div className="IngListForm">
      <span>NOM | QUANTITÉ | PRIX</span>
      <div>
        {" "}
        {listIng.map((ing) => (
          <IngredientRowForm listIng={listIng} ingredient={ing} />
        ))}
      </div>

      <Button
        onClick={() => setAddIngredient(true)}
        variant="outline-secondary"
      >
        + Ingrédient
      </Button>
      <AddIngredientForm
        show={addIngredient}
        setShow={setAddIngredient}
        listIng={listIng}
      />
    </div>
  );
}

export { IngredientListForm };
