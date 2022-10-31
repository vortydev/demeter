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
  listIng: IngForRecipe[];
}

function AddIngredientForm({
  show,
  setShow,
  listIng,
}: AIFProps) {
  const [productList, setProductList] = useState<Product[]>([]);
  const [mesureList, setListMesurement] = useState<Mesurement[]>([]);

  useEffect(() => {
    async function getLists() {
      setProductList(await getProductsByCategory("1"));
      setListMesurement(await getAllMesurements());
    }
    getLists();
  }, [show]);

 const addToRecipeList = () => {
    const ingredient = (
      document.getElementById("product") as HTMLInputElement
    ).value; 
    const quantity = parseInt(
      (document.getElementById("quantity") as HTMLInputElement).value
    );
    const mesurement = (
      document.getElementById("mesurement") as HTMLInputElement
    ).value;

    const productSelected: Product | undefined = productList.find(
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

      listIng.push(toAdd);
      setShow(false);
      


    } else {
      console.log("something is not working, make an alert appears");
    }
  }

  return (
    <Modal show={show}>
      <Form>
        <Form.Select id="product">
          {productList.map((product) => (
            <option value={product.id.toString()}>{product.name}</option>
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
