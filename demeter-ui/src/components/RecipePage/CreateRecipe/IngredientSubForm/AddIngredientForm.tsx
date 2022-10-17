import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { IngForRecipe } from "../../../../types/RecipeTypes.types";
import {
  getAllMesurements,
  getProductsByCategory,
} from "../../../../services/inventory.functions";
import { Mesurement, Product } from "../../../../types/Types";

interface AIFProps {
  show: boolean;
  setShow: (show: boolean) => void;
  currentList: IngForRecipe[];
  setListIngAdded: (list: IngForRecipe[]) => void;
}

function AddIngredientForm({
  show,
  setShow,
  currentList,
  setListIngAdded,
}: AIFProps) {
  const [ingList, setListIng] = useState<Product[]>([]);
  const [mesureList, setListMesurement] = useState<Mesurement[]>([]);

  useEffect(() => {
    async function getLists() {
      setListIng(await getProductsByCategory("1"));
      setListMesurement(await getAllMesurements());
    }
    getLists();
  }, [show]);

  function addToRecipeList() {
    const ingredient = (
      document.getElementById("ingredient") as HTMLInputElement
    ).value; // this return the id not the whole thing, make a fin on list
    const quantity = parseInt(
      (document.getElementById("quantity") as HTMLInputElement).value
    );
    const mesurement = (
      document.getElementById("mesurement") as HTMLInputElement
    ).value;

    const productSelected: Product | undefined = ingList.find(
      (x) => x.id === parseInt(ingredient)
    );


    if (
      productSelected !== undefined &&
      mesurement!== undefined &&
      quantity > 0
    ) {
      const toAdd: IngForRecipe = {
        ingredient: productSelected,
        quantity: quantity,
        mesurementId: mesurement,
      };

      currentList.push(toAdd);
      console.log(currentList);
      setListIngAdded(currentList);
      setShow(false);


    } else {
      console.log("something is not working, make an alert appears");
    }
  }

  return (
    <Modal show={show}>
      <Form>
        <Form.Select id="ingredient">
          {ingList.map((ing) => (
            <option value={ing.id.toString()}>{ing.name}</option>
          ))}
        </Form.Select>
        <Form.Group controlId="quantity">
          <Form.Label>QUANTITÉ</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Form.Select id="mesurement">
          {mesureList.map((mesure) => (
            <option value={mesure.id.toString()}>{mesure.mesurement}</option>
          ))}
        </Form.Select>
      </Form>
      <Button onClick={addToRecipeList}>Ajouter</Button>
      <Button onClick={() => setShow(false)}>Annuler</Button>
    </Modal>
  );
}

export { AddIngredientForm };
