import { useState } from "react";
import { Button, Form, Modal, Nav } from "react-bootstrap";
import { updateRecipe } from "../../../../services/recipe.functions";
import { Ingredient, Recipe } from "../../../../types/Types";
import { EditIngredient } from "./EditIngredients";

interface ERFProps {
  recipe: Recipe;
  listIng: Ingredient[];
  show: boolean;
  setRecipe: (recipe : Recipe | null)=> void;
  setShow: (show: boolean) => void;
  setChanged: (changed: boolean) => void;
  editedSuccess: (edited: boolean) => void;
}

function EditRecipeForm({
  recipe,
  listIng,
  show,
  setRecipe,
  setShow,
  setChanged,
  editedSuccess,
}: ERFProps) {
  const [recipeInfo, setRecipeInfo] = useState<Recipe>(recipe);
  const [editing, setEditing] = useState<String>("recipe");

  function updateRecipeInfo() {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const category = (document.getElementById("category") as HTMLInputElement)
      .value;
    const instructions = (
      document.getElementById("instructions") as HTMLInputElement
    ).value;
    const otherExpenses = (
      document.getElementById("otherExpenses") as HTMLInputElement
    ).value;
    const nbProduct = (document.getElementById("nbProduct") as HTMLInputElement)
      .value;

    const recipe: Recipe = {
      id: 1,
      title: title,
      categoryrecipeId: parseInt(category),
      instruction: instructions,
      otherCost: parseFloat(otherExpenses),
      nbUnitCreated: parseInt(nbProduct),
      available: true,
    };

    setRecipeInfo(recipe);
  }

  async function editRecipe() {
    if (await updateRecipe(recipe.id, recipeInfo)) {
      setRecipe(recipeInfo);
      editedSuccess(true);
      setShow(false);
    } else {
      console.log("problème édition recette !");
    }
  }

  return (
    <Modal show={show}>
      <Nav defaultActiveKey="recipe" variant="tabs">
        {" "}
        <Nav.Item>
          <Nav.Link onClick={() => setEditing("recipe")} eventKey="recipe">
            Recette
          </Nav.Link>
        </Nav.Item>{" "}
        <Nav.Item>
          <Nav.Link
            onClick={() => setEditing("ingredient")}
            eventKey="ingredient"
          >
            Ingrédients
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {editing === "ingredient" && (
        <EditIngredient
          listIng={listIng}
          recipeId={recipe.id}
          setChanged={setChanged}
        />
      )}
      {editing === "recipe" && (
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>TITRE : </Form.Label>
              <Form.Control
                onChange={updateRecipeInfo}
                defaultValue={recipe.title}
                type="text"
              />
            </Form.Group>
            <Form.Select
              onChange={updateRecipeInfo}
              defaultValue={recipe.categoryrecipeId}
              className="mb-3"
              aria-label="CATÉGORIE : "
              id="category"
            >
              <option>Choisir</option>
              <option value="1">Boulangerie</option>
              <option value="2">Patisserie</option>
              <option value="3">Viennoiserie</option>
              <option value="4">Cuisine</option>
            </Form.Select>
            <Form.Group
              onChange={updateRecipeInfo}
              className="mb-3"
              controlId="instructions"
            >
              <Form.Label>INSTRUCTIONS : </Form.Label>
              <Form.Control
                defaultValue={recipe.instruction}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group
              onChange={updateRecipeInfo}
              className="mb-3"
              controlId="otherExpenses"
            >
              <Form.Label>AUTRE FRAIS : </Form.Label>
              <Form.Control defaultValue={recipe.otherCost} type="number" />
            </Form.Group>
            <Form.Group
              onChange={updateRecipeInfo}
              className="mb-3"
              controlId="nbProduct"
            >
              <Form.Label>NB PRODUIT : </Form.Label>
              <Form.Control defaultValue={recipe.nbUnitCreated} type="number" />
            </Form.Group>
          </Form>
        </div>
      )}
      <Button onClick={editRecipe}>ENVOYER</Button>
      <Button onClick={() => setShow(false)}>ANNULER</Button>
    </Modal>
  );
}

export { EditRecipeForm };