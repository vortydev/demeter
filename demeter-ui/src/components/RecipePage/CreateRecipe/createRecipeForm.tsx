import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { Recipe } from "../../../types/Types";


interface CRFProps {
  setRecipeInfo: (recipe: Recipe) => void;
  role: string;
}

function CreateRecipeForm({ setRecipeInfo, role }: CRFProps) {

  const [departement, setDepartement] = useState<number | null>(null);
  useEffect(() => {
    switch (role) {
      case "5": // Cuisine
        setDepartement(4);
        break;
      case "6": // Boulangerie
        setDepartement(1);
        break;
      case "7": // Viennoiserie
        setDepartement(3);
        break;
      case "8": // Patisserie
        setDepartement(2);
        break;
      default:
        setDepartement(null);
        break;
    }
  }, []);

  function updateRecipeInfo() {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const category = departement !== null ? departement : parseInt((document.getElementById("category") as HTMLInputElement).value);
    const instructions = (document.getElementById("instructions") as HTMLInputElement).value;
    const otherExpenses = (document.getElementById("otherExpenses") as HTMLInputElement).value;
    const nbProduct = (document.getElementById("nbProduct") as HTMLInputElement).value;


    const recipe: Recipe = {
      id: 1,
      title: title,
      categoryrecipeId: category,
      instruction: instructions,
      otherCost: parseFloat(otherExpenses),
      nbUnitCreated: parseInt(nbProduct),
      available: true,
    }

    setRecipeInfo(recipe);

  }

  return (
    <div>
      <Form className="popupForm newRecipeForm">
        <Form.Group className="mb-2" controlId="title">
          <Form.Label>Titre</Form.Label>
          <Form.Control onChange={updateRecipeInfo} type="text" />
        </Form.Group>

        {!departement &&
          <Form.Group className="popupSelectBox mb-2" controlId="category">
            <Form.Label className="popupSelectLabel">Département</Form.Label>
            <Form.Select onChange={updateRecipeInfo} aria-label="Département" id="category">
              <option value="1">Boulangerie</option>
              <option value="2">Pâtisserie</option>
              <option value="3">Viennoiserie</option>
              <option value="4">Cuisine</option>
            </Form.Select>
          </Form.Group>
        }

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