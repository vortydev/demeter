import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { Recipe } from "../../../types/Types";


interface CRFProps {
  setRecipeInfo: (recipe: Recipe) => void;
}

function CreateRecipeForm({ setRecipeInfo }: CRFProps) {

  function updateRecipeInfo() {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const category = (document.getElementById("category") as HTMLInputElement).value;
    const instructions = (document.getElementById("instructions") as HTMLInputElement).value;
    const otherExpenses = (document.getElementById("otherExpenses") as HTMLInputElement).value;
    const nbProduct = (document.getElementById("nbProduct") as HTMLInputElement).value;


    const recipe: Recipe = {
      id: 1,
      title: title,
      categoryrecipeId: parseInt(category),
      instruction: instructions,
      otherCost: parseFloat(otherExpenses),
      nbUnitCreated: parseInt(nbProduct),
      available: true,
    }

    setRecipeInfo(recipe);

  }

  return (
    <div>
      <Form className="popupForm">
        <h3 className="popupTitle">Nouvelle Recette</h3>
        <Form.Group className="mb-2" controlId="title">
          <Form.Label>Titre</Form.Label>
          <Form.Control onChange={updateRecipeInfo} type="text" />
        </Form.Group>

        <Form.Group className="popupSelectBox mb-2" controlId="category">
          <Form.Label className="popupSelectLabel">Département</Form.Label>
          <Form.Select onChange={updateRecipeInfo} aria-label="Département" id="category">
            <option value="1">Boulangerie</option>
            <option value="2">Pâtisserie</option>
            <option value="3">Viennoiserie</option>
            <option value="4">Cuisine</option>
          </Form.Select>
        </Form.Group>

        <Form.Group onChange={updateRecipeInfo} className="mb-2" controlId="instructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group onChange={updateRecipeInfo} className="mb-2" controlId="otherExpenses">
          <Form.Label>Autres frais</Form.Label>
          <Form.Control defaultValue={0} type="number" />
        </Form.Group>

        <Form.Group onChange={updateRecipeInfo} className="mb-2" controlId="nbProduct">
          <Form.Label>Nombre de produits</Form.Label>
          <Form.Control defaultValue={0} type="number" />
        </Form.Group>
      </Form>
    </div>
  );
}

export { CreateRecipeForm };