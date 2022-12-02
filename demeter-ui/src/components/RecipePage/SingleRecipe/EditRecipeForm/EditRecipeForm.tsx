import { useState } from "react";
import { Alert, Button, Form, Modal, Nav } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { updateRecipe } from "../../../../services/recipe.functions";
import { Ingredient, Recipe } from "../../../../types/Types";
import { EditIngredient } from "./EditIngredients";

interface ERFProps {
  recipe: Recipe;
  listIng: Ingredient[];
  show: boolean;
  setRecipe: (recipe: Recipe | null) => void;
  setShow: (show: boolean) => void;
  setChanged: (changed: boolean) => void;
  editedSuccess: (edited: boolean) => void;
  role: string;
}

function EditRecipeForm({
  recipe,
  listIng,
  show,
  setRecipe,
  setShow,
  setChanged,
  editedSuccess,
  role
}: ERFProps) {
  const [recipeInfo, setRecipeInfo] = useState<Recipe>(recipe);
  const [editing, setEditing] = useState<String>("recipe");

  const [empty, setEmpty] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);

  function updateRecipeInfo() {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const category = (role !== "1" && role !== "4") ? recipe.categoryrecipeId : parseInt((document.getElementById("category") as HTMLInputElement)
      .value);
    const instructions = (
      document.getElementById("instructions") as HTMLInputElement
    ).value;
    const otherExpenses = (
      document.getElementById("otherExpenses") as HTMLInputElement
    ).value;
    const nbProduct = (document.getElementById("nbProduct") as HTMLInputElement)
      .value;

    const editRecipe: Recipe = {
      ...recipe,
      title: title,
      categoryrecipeId: category,
      instruction: instructions,
      otherCost: parseFloat(otherExpenses),
      nbUnitCreated: parseInt(nbProduct),
    };
    setRecipeInfo(editRecipe);
  }

  async function editRecipe() {
    if (recipeInfo.title === "" || !recipeInfo.categoryrecipeId || !recipeInfo.instruction || recipeInfo.otherCost < 0 || recipeInfo.nbUnitCreated <= 0) {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 5000);
    }
    else {
      if (await updateRecipe(recipe.id, recipeInfo)) {
        setRecipe(recipeInfo);
        editedSuccess(true);
        setShow(false);
      } else {
        setInvalid(true);
      }
    }
  }

  return (
    <Modal show={show}>
      <Nav defaultActiveKey="recipe" variant="tabs">
        <Nav.Item>
          <Nav.Link className="nav-link-tab" onClick={() => setEditing("recipe")} eventKey="recipe">
            Recette
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-link-tab" onClick={() => setEditing("ingredient")} eventKey="ingredient">
            Ingrédients
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {empty && <Alert variant="danger">Veuillez remplir tous les champs de la recette.</Alert>}
      {invalid && (<Alert variant="danger">Informations invalides, la recette n'a pas été modifiée.</Alert>)}
      {editing === "ingredient" && (
        <EditIngredient
          listIng={listIng}
          recipeId={recipe.id}
          setChanged={setChanged}
        />
      )}

      {editing === "recipe" && (
        <div>
          <Form className="popupForm">
            <Form.Group className="mb-2" controlId="title">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                onChange={updateRecipeInfo}
                defaultValue={recipe.title}
                type="text"
              />
            </Form.Group>

            {(role === "1" || role === "4") && <Form.Group className="popupSelectBox mb-2" controlId="category">
              <Form.Label className="popupSelectLabel">Département</Form.Label>
              <Form.Select onChange={updateRecipeInfo} defaultValue={recipe.categoryrecipeId} aria-label="Département" id="category">
                <option value="1">Boulangerie</option>
                <option value="2">Pâtisserie</option>
                <option value="3">Viennoiserie</option>
                <option value="4">Cuisine</option>
              </Form.Select>
            </Form.Group>}

            <Form.Group onChange={updateRecipeInfo} className="mb-2" controlId="instructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control defaultValue={recipe.instruction} as="textarea" rows={3} />
            </Form.Group>

            <Form.Group onChange={updateRecipeInfo} className="mb-2" controlId="otherExpenses">
              <Form.Label>Autres frais</Form.Label>
              <Form.Control defaultValue={recipe.otherCost} type="number" />
            </Form.Group>

            <Form.Group onChange={updateRecipeInfo} className="mb-2" controlId="nbProduct">
              <Form.Label>Nombre de produits</Form.Label>
              <Form.Control defaultValue={recipe.nbUnitCreated} type="number" />
            </Form.Group>
          </Form>
        </div>
      )}

      <div className="popupBtnBox mb-3">
        <Button variant="demeter-dark" onClick={() => setShow(false)}>Annuler</Button>
        <Button variant="demeter" onClick={editRecipe}>Confirmer</Button>
      </div>
    </Modal>
  );
}

export { EditRecipeForm };
