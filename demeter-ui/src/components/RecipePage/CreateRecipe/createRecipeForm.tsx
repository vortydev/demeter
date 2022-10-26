import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { RawRecipe } from "../../../types/RecipeTypes.types";


interface CRFProps{
  setRecipeInfo: (recipe: RawRecipe)=>void;
}

  function CreateRecipeForm({setRecipeInfo}: CRFProps) {

    function updateRecipeInfo(){
      const title = document.getElementById("title") as HTMLInputElement;
      const category = document.getElementById("category") as HTMLInputElement;
      const instructions = document.getElementById("instructions") as HTMLInputElement;
      const otherExpenses = document.getElementById("otherExpenses") as HTMLInputElement;
      const nbProduct = document.getElementById("nbProduct") as HTMLInputElement;

      const recipe :RawRecipe={
        title : title.value,
        category : parseInt(category.value),
        instructions : instructions.value,
        otherCost: parseFloat(otherExpenses.value),
        nbProductCreated: parseInt(nbProduct.value),
      }

      setRecipeInfo(recipe);

    }

    return(
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>TITRE : </Form.Label>
            <Form.Control onChange={updateRecipeInfo} type="text"/>
          </Form.Group>
          <Form.Select onChange={updateRecipeInfo} className="mb-3" aria-label="CATÉGORIE : " id="category">
            <option>Choisir</option>
            <option value="1">Boulangerie</option>
            <option value="2">Patisserie</option>
            <option value="3">Cuisine</option>
            <option value="4">Viennoiserie</option>
          </Form.Select>
          <Form.Group onChange={updateRecipeInfo} className="mb-3" controlId="instructions">
            <Form.Label>INSCTRUCTIONS : </Form.Label>
            <Form.Control as="textarea" rows={3}/>
          </Form.Group>
          <Form.Group onChange={updateRecipeInfo} className="mb-3" controlId="otherExpenses">
            <Form.Label>AUTRE FRAIS : </Form.Label>
            <Form.Control type="number"/>
          </Form.Group>
          <Form.Group onChange={updateRecipeInfo} className="mb-3" controlId="nbProduct">
            <Form.Label>NB PRODUIT : </Form.Label>
            <Form.Control type="number"/>
          </Form.Group>
        </Form>
      </div>
    );
  }

  export { CreateRecipeForm };