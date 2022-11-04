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
      mesurement !== undefined &&
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
      <Form className="popupForm">
        <h3 className="popupTitle">Ajout d'un ingrédient</h3>
        <Form.Group className="popupSelectBox mb-2" controlId="product">
          <Form.Label className="popupSelectLabelFull">Produit</Form.Label>
          <Form.Select id="product">
            {productList.map((product) => (
              <option value={product.id.toString()}>{product.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2" controlId="quantity">
          <Form.Label>Quantité</Form.Label>
          <Form.Control type="number" />
        </Form.Group>

        <Form.Group className="popupSelectBox mb-2" controlId="mesurement">
          <Form.Label className="popupSelectLabel">Mesure</Form.Label>
          <Form.Select id="mesurement">
            {mesureList.map((mesure) => (
              <option value={mesure.id.toString()}>{mesure.mesurement}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="popupBtnBox mt-3">
          <Button variant="demeter-dark" onClick={() => setShow(false)}>Annuler</Button>
          <Button variant="demeter" onClick={addToRecipeList}>Ajouter</Button>
        </div>
      </Form>
    </Modal>
  );
}

export { AddIngredientForm };
