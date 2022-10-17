import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { getProductsByCategory } from "../../../../services/inventory.functions";
import { Product } from "../../../../types/Types";

interface AIFProps {
    show : boolean;
    setShow: (show:boolean) => void;
}

function AddIngredientForm({show, setShow}: AIFProps){
const [ingList, setListIng] = useState<Product[]>([]);
const [selectedIng, setSelectedIng] = useState<Product|null>(null);
   
    useEffect(() => {
        async function getList() {
          setListIng(await getProductsByCategory("1"));
        }
        getList();
        console.log("ingredientList",ingList);
      }, [show]);

    
      function addToRecipeList(){
        const ingredient = document.getElementById("ingredient") as HTMLInputElement; // this return the id not the whole thing, make a fin on list 
        const quantity = document.getElementById("quantity") as HTMLInputElement;

        console.log(ingredient, quantity);

      }

   
    return (<Modal show={show}>
        <Form>
        <Form.Select  id="ingredient">
        {ingList.map((ing) => (
            <option value={ing.id.toString()}>{ing.name}</option>
        ))}
         </Form.Select>
         <Form.Label controlId="quantity">QUANTITÉ</Form.Label>
          <Form.Control type="number" />
        </Form>  
        <Button onClick={addToRecipeList}>Ajouter</Button><Button onClick={()=>setShow(false)}>Annuler</Button>
    </Modal>)
}

export {AddIngredientForm};