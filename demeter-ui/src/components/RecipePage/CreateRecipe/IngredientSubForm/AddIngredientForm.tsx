import { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { Button } from "react-bootstrap/lib/InputGroup";
import { getProductByCategory } from "../../../../services/inventory.functions";
import { Product } from "../../../../types/Types";

interface AIFProps {
    show : boolean;
}

function AddIngredientForm({show}: AIFProps){
const [ingList, setListIng] = useState<Product[]>([]);
const [selectedIng, setSelectedIng] = useState<Product|null>(null);
   
    useEffect(() => {
        async function getList() {
          setListIng(await getProductByCategory(1));
        }
        getList();
      }, [ingList]);



      function addToRecipeList(){
        const ingredient = document.getElementById("ingredient") as HTMLInputElement; // this return the id not the whole thing, make a fin on list 
        const quantity = document.getElementById("quantity") as HTMLInputElement;

        console.log(ingredient, quantity);

      }

   
    return (<Modal show={show}>
        <Form>
        <Form.Select  id="ingredient">
        {ingList.map((ing) => (
            <option value={ing.id.toString()}>{ing.prodName}</option>
        ))}
         </Form.Select>
         <Form.Label controlId="quantity">QUANTITÉ</Form.Label>
          <Form.Control type="number" />
        </Form>  
        <Button onClick={addToRecipeList}>Ajouter</Button><Button>Annuler</Button>
    </Modal>)
}

export {AddIngredientForm};