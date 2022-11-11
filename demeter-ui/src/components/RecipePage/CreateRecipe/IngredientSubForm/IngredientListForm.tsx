import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { IngForRecipe } from "../../../../types/RecipeTypes.types";
import { getRecipeCost } from "../../helper";
import { AddIngredientForm } from "./AddIngredientForm";
import { IngredientRowForm } from "./IngredientRowForm";

interface ILFProps {
  listIng: IngForRecipe[];
  setRecipeCost: (cost: number) => void;
}

function IngredientListForm({ listIng, setRecipeCost }: ILFProps) {
  const [addIngredient, setAddIngredient] = useState<boolean>(false);
  const [deleteIngredient, setDeleteIngredient] = useState<boolean>(false);

  useEffect(() => {
    setRecipeCost(getRecipeCost(listIng));
  }, [deleteIngredient, addIngredient]);

  const delay = 3;
  useEffect(() => {
    let timer = setTimeout(() => setDeleteIngredient(false), delay * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [deleteIngredient]);

  if (listIng.length <= 0) {
    return (
      <div className="ingListEmpty popupForm">
        <span>Aucun Ingrédient</span>

        <Button className="mt-3" variant="demeter-dark" onClick={() => {
            setAddIngredient(true);
            setDeleteIngredient(false);
          }}>+ Ingrédient</Button>

        <AddIngredientForm
          show={addIngredient}
          setShow={setAddIngredient}
          listIng={listIng}
        />
      </div>
    );
  }

  return (
    <div className="ingListForm popupForm">
      {deleteIngredient && ( <Alert variant="success">Ingrédient supprimé avec succès!</Alert>)}
      <div className="ingListHeader flex mb-2">
        <span className="ingListCol">Nom</span>
        <span className="ingListColS">Quantité</span>
        <span className="ingListColS">Coût</span>
      </div>
      <div>
        {listIng.map((ing) => (
          <IngredientRowForm
            setDeleteIngredient={setDeleteIngredient}
            listIng={listIng}
            ingredient={ing}
          />
        ))}
      </div>

      <Button className="mt-1" variant="demeter-dark"
        onClick={() => {
          setAddIngredient(true);
          setDeleteIngredient(false);
        }}>+ Ingrédient</Button>

      <AddIngredientForm
        show={addIngredient}
        setShow={setAddIngredient}
        listIng={listIng}
      />
    </div>
  );
}

export { IngredientListForm };
