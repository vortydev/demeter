import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap"
import { confirmAlert } from "react-confirm-alert";
import { createIngredient, deleteOneIngredientsByRecipe } from "../../../../services/Ingredients.functions";
import { getAllMesurements, getProductsByCategory } from "../../../../services/inventory.functions";
import { Ingredient, Mesurement, Product } from "../../../../types/Types";
import { IngredientRow } from "../IngredientRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";


interface EditIngredientProps {
  listIng: Ingredient[];
  setChanged: (changed: boolean) => void;
  recipeId: number;
}

function EditIngredient({ listIng, recipeId, setChanged }: EditIngredientProps) {
  const [addingIng, setAddingIng] = useState<boolean>(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [mesureList, setListMesurement] = useState<Mesurement[]>([]);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);
  const [specificMesure, setSpecificMesure] = useState<Mesurement[]>(mesureList);
  const [ingAlready, setIngAlready] = useState<boolean>(false);

  useEffect(() => {
    async function getLists() {
      setProductList(await getProductsByCategory("1"));
      setListMesurement(await getAllMesurements());
    }
    getLists();
  }, [addingIng]);


  async function removeIngredient(ing: Ingredient) {
    const deleted = await deleteOneIngredientsByRecipe(ing.recipeId, ing.productId);
    setChanged(true);
    setTimeout(() => {
      setChanged(false);
    }, 5000);
  }

  async function addIngredient() {
    console.log('in add Ingredient');

    const productId = parseInt((
      document.getElementById("product") as HTMLInputElement
    ).value);
    const quantity = parseInt(
      (document.getElementById("quantity") as HTMLInputElement).value
    );
    const mesurement = parseInt((
      document.getElementById("mesurement") as HTMLInputElement
    ).value);

    if (
      productId !== undefined &&
      mesurement !== undefined &&
      quantity > 0
    ) {
      if (listIng.filter((obj) => {
        return obj.productId === productId;
      }).length > 0) {
        setIngAlready(true);
      } else {
        const ingredient: Ingredient = {
          productId: productId,
          recipeId: recipeId,
          mesurementId: mesurement,
          qty: quantity,
        }

        if (await createIngredient(ingredient)) {
          listIng.push(ingredient);
          setAddingIng(false);
          setChanged(true);
        }
      }
    } else {
      setEmpty(true);
    }
    setTimeout(() => {
      setEmpty(false);
      setIngAlready(false);
      setChanged(false);
    }, 5000);

  }

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

    } else if (mesureId === 3 || mesureId === 4) {
      setSpecificMesure(
        mesureList.filter((mesure) => mesure.id === 3 || mesure.id === 4)
      );
    } else {
      setSpecificMesure(
        mesureList.filter((mesure) => mesure.id === 5)
      );
    }
  }

  return (<div className="popupForm">
    <div className="ingListHeader flex mb-2">
      <span className="ingListCol">Nom</span>
      <span className="ingListColS">Quantité</span>
      <span className="ingListColS">Coût</span>
    </div>
    {listIng.map((ing) => (
      <div className="cellShade flex ingListRow mb-2">
        <IngredientRow ingredient={ing} />
        <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
          confirmAlert({
            title: 'Confirmation',
            message: 'Êtes-vous sur de vouloir supprimer cet ingrédient?',
            buttons: [
              {
                label: 'Oui',
                onClick: () => { removeIngredient(ing); setDeleteSuccess(true) }
              },
              {
                label: 'Non',
                onClick: () => { }
              }
            ]
          });
        }} />
      </div>
    ))}

    {!addingIng && <div className="btnBar">
      <Button onClick={() => setAddingIng(true)} variant="icon-outline">
        <FontAwesomeIcon className="icon" icon={faPlus} size="lg" />
        <span>Ingrédient</span></Button>
    </div>}

    {addingIng &&
      <Form className="popupForm">
        <hr className="loginLine mb-2" />
        <h4 className="popupTitle">Ajouter un ingrédient</h4>
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

        <div className="popupBtnBox mt-3 mb-2">
          <Button variant="demeter-dark" onClick={() => setAddingIng(false)}>Annuler</Button>
          <Button variant="demeter" onClick={addIngredient}>Ajouter</Button>
        </div>
        <hr className="loginLine mt-2" />
      </Form>}
  </div>)
}

export { EditIngredient }