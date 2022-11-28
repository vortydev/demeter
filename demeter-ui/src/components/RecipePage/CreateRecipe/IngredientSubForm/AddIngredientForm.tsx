import { useEffect, useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
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

function AddIngredientForm({ show, setShow, listIng }: AIFProps) {
  const [productList, setProductList] = useState<Product[]>([]);
  const [mesureList, setListMesurement] = useState<Mesurement[]>([]);
  const [specificMesure, setSpecificMesure] = useState<Mesurement[]>(mesureList);
  const [empty, setEmpty] = useState<boolean>(false);
  const [ingAlready, setIngAlready] = useState<boolean>(false);

  useEffect(() => {
    async function getLists() {
      setProductList(await getProductsByCategory("1"));
      setListMesurement(await getAllMesurements());
    }
    getLists();
  }, [show]);

  function updateMesurementOptions() {
    const ingredient = (document.getElementById("product") as HTMLInputElement)
      .value;

    const productSelected: Product | undefined = productList.find(
      (x) => x.id === parseInt(ingredient)
    );

    console.log(productSelected!.mesurementId);

    const mesureId = parseInt(productSelected!.mesurementId);

    if (mesureId === 1 || mesureId === 2 || mesureId === 6) {
      setSpecificMesure(
        mesureList.filter(
          (mesure) => mesure.id === 1 || mesure.id === 2 || mesure.id === 6
        )
      );

    } else if (mesureId === 3 || mesureId == 4) {
      setSpecificMesure(
        mesureList.filter((mesure) => mesure.id === 3 || mesure.id === 4)
      );
    } else {
      setSpecificMesure(
        mesureList.filter((mesure) => mesure.id === 5)
      );
    }

  }

  const addToRecipeList = () => {
    const ingredient = (document.getElementById("product") as HTMLInputElement)
      .value;
    const quantity = parseInt(
      (document.getElementById("quantity") as HTMLInputElement).value
    );
    const mesurement = (
      document.getElementById("mesurement") as HTMLInputElement
    ).value;

    const productSelected: Product | undefined = productList.find(
      (x) => x.id === parseInt(ingredient)
    );

    setEmpty(false);

    if (
      productSelected !== undefined &&
      mesurement !== undefined &&
      quantity > 0
    ) {
      if (listIng.filter((obj) => {
        return obj.ingredient.name === productSelected.name;
      }).length > 0) {
        setIngAlready(true);
      } else {
        const toAdd: IngForRecipe = {
          ingredient: productSelected,
          quantity: quantity,
          mesurementId: mesurement,
        };

        listIng.push(toAdd);
        setShow(false);
      }

    } else {
      setEmpty(true);
    }
    setTimeout(() => {
      setEmpty(false);
      setIngAlready(false);
    }, 5000);
  };

  return (
    <Modal show={show}>
      <Form className="popupForm">
        <h3 className="popupTitle">Ajouter un ingrédient</h3>
        {empty && <Alert variant="danger">Veuillez remplir tous les champs.</Alert>}
        {ingAlready && <Alert variant="danger">Cet ingrédient est déjà dans la recette</Alert>}
        
        <Form.Group className="popupSelectBox mb-2" controlId="product">
          <Form.Label className="popupSelectLabel">Produit</Form.Label>
          <Form.Select onChange={updateMesurementOptions} id="product">
            <option>Choisir un ingrédient</option>
            {productList.map((product) => (
              <option value={product.id.toString()}>{product.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="flexPopupRow mb-2">
          <Form.Group className="addIngQt flex" controlId="quantity">
            <Form.Label className="popupSelectLabel">Quantité</Form.Label>
            <Form.Control type="number" />
          </Form.Group>

          <Form.Select id="mesurement">
            {specificMesure.map((mesure) => (
              <option value={mesure.id.toString()}>{mesure.mesurement}</option>
            ))}
          </Form.Select>
        </div>

        <div className="popupBtnBox mt-3">
          <Button variant="demeter-dark" onClick={() => setShow(false)}>
            Annuler
          </Button>
          <Button variant="demeter" onClick={addToRecipeList}>
            Confirmer
          </Button>
        </div>
      </Form >
    </Modal >
  );
}

export { AddIngredientForm };
