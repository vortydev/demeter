import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { Recipe } from "../../../types/Types";


interface CRFProps{
  setRecipeInfo: (recipe: Recipe)=>void;
}

  function CreateRecipeForm({setRecipeInfo}: CRFProps) {

    function updateRecipeInfo(){
      const title = (document.getElementById("title") as HTMLInputElement).value;
      const category = (document.getElementById("category") as HTMLInputElement).value;
      const instructions = (document.getElementById("instructions") as HTMLInputElement).value;
      const otherExpenses = (document.getElementById("otherExpenses") as HTMLInputElement).value;
      const nbProduct = (document.getElementById("nbProduct") as HTMLInputElement).value;


      const recipe :Recipe={
        id: 1,
        title : title,
        categoryrecipeId : parseInt(category),
        instruction : instructions,
        otherCost: parseFloat(otherExpenses),
        nbUnitCreated: parseInt(nbProduct),
        available:true,
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
            <option value="3">Viennoiserie</option>
            <option value="4">Cuisine</option>
          </Form.Select>
          <Form.Group onChange={updateRecipeInfo} className="mb-3" controlId="instructions">
            <Form.Label>INSTRUCTIONS : </Form.Label>
            <Form.Control as="textarea" rows={3}/>
          </Form.Group>
          <Form.Group onChange={updateRecipeInfo} className="mb-3" controlId="otherExpenses">
            <Form.Label>AUTRE FRAIS : </Form.Label>
            <Form.Control defaultValue={0} type="number"/>
          </Form.Group>
          <Form.Group onChange={updateRecipeInfo} className="mb-3" controlId="nbProduct">
            <Form.Label>NB PRODUIT : </Form.Label>
            <Form.Control defaultValue={0} type="number"/>
          </Form.Group>
        </Form>
      </div>
    );
  }

  export { CreateRecipeForm };