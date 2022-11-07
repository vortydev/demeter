import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { createIngredient, deleteOneIngredientsByRecipe } from "../../../../services/Ingredients.functions";
import { getAllMesurements, getProductsByCategory } from "../../../../services/inventory.functions";
import { IngForRecipe } from "../../../../types/RecipeTypes.types";
import { Ingredient, Mesurement, Product } from "../../../../types/Types";
import { IngredientRow } from "../IngredientRow"

interface EditIngredientProps {
    listIng :Ingredient[];
    setChanged: (changed: boolean) => void;
    recipeId :number;
}

function EditIngredient({listIng, recipeId, setChanged} : EditIngredientProps) {
    const [addingIng, setAddingIng] = useState<boolean>(false);
    const [productList, setProductList] = useState<Product[]>([]);
    const [mesureList, setListMesurement] = useState<Mesurement[]>([]);

    useEffect(() => {
        async function getLists() {
          setProductList(await getProductsByCategory("1"));
          setListMesurement(await getAllMesurements());
        }
        getLists();
      }, [addingIng]);
    

    async function removeIngredient(ing: Ingredient){
        const deleted = await deleteOneIngredientsByRecipe(ing.recipeId, ing.productId);
        setChanged(true);
       }

       async function addIngredient(){
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

        const ingredient : Ingredient = {
            productId: productId,
            recipeId : recipeId,
            mesurementId: mesurement,
            qty: quantity,
        }

        console.log(ingredient);
        
        if(await createIngredient(ingredient)){
            setAddingIng(false);
        }
         

       }



    return(<div>
        {listIng.map((ing) => (
          <div>
            <IngredientRow ingredient={ing} />
            <Button onClick={()=>removeIngredient(ing)}>DELETE</Button>
          </div>
        ))}
        {!addingIng && <Button onClick={()=>setAddingIng(true)} variant="outline-dark">+ ingrédient</Button>}
        {addingIng &&
        <Form className="popupForm">
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
          <Button variant="demeter-dark" onClick={() => setAddingIng(false)}>Annuler</Button>
          <Button variant="demeter" onClick={addIngredient}>Ajouter</Button>
        </div>
      </Form>}
      </div>)
}

export{EditIngredient}