import { useState } from "react";
import { Button } from "react-bootstrap";
import { IngForRecipe } from "../../../../types/RecipeTypes.types";
import { AddIngredientForm } from "./AddIngredientForm";
import { IngredientRowForm } from "./IngredientRowForm";

interface ILFProps {
  listIng: IngForRecipe[];
  setListIng: (list: IngForRecipe[]) => void;
}

function IngredientListForm({ listIng, setListIng }: ILFProps) {
  const [addIngredient, setAddIngredient] = useState<boolean>(false);


  return (
    <div className="IngListForm">
      <span>NOM | QUANTITÉ | PRIX</span>
      <div>
        {" "}
        {listIng.map((ing) => (
          <IngredientRowForm ingredient={ing} />
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
        currentList={listIng}
        setListIngAdded={setListIng}
      />
    </div>
  );
}

export { IngredientListForm };
