import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  getMesurementById,
  getProduct,
} from "../../../services/inventory.functions";
import { IngForRecipe } from "../../../types/RecipeTypes.types";
import { Ingredient } from "../../../types/Types";
import { getRecipeCost } from "../helper";
import { RecipeList } from "../RecipeList";

interface CalculatorProps {
  listIng: Ingredient[];
  nbUnit: number;
}

function Calculator({ listIng, nbUnit }: CalculatorProps) {
  const [totalCost, setTotalCost] = useState<number>(0);
  const [customNB, setCustomNB] = useState<number>(0);
  console.log('listINg props received',  listIng );

  useEffect(() => {
    async function setTheCost() {
      setTotalCost(getRecipeCost(await changeIngFormat(listIng)));
    }
    setTheCost();
  }, []);

  function updateCustomNb() {
    setCustomNB(
      parseFloat(
        (document.getElementById("customNB") as HTMLInputElement).value
      )
    );
  }
  return (
    <div>
      <span>COÛT TOTAL : {totalCost} $</span>
      <span>COÛT UNITAIRE : {totalCost / nbUnit}</span>
      <span>COÛT PERSONNALISÉ : {(totalCost / nbUnit) * customNB}</span>
      <Form>
        <Form.Group
          onChange={updateCustomNb}
          className="mb-3"
          controlId="customNB"
        >
          <Form.Label>Prix pour X unité </Form.Label>
          <Form.Control defaultValue={0} type="number" />
        </Form.Group>
      </Form>
    </div>
  );
}

async function changeIngFormat(listI: Ingredient[]): Promise<IngForRecipe[]> {
  console.log("in change Format", listI);
  let listIF: IngForRecipe[] = [];
  for (let i of listI) {
    console.log("in the looooop");
    const product = await getProduct(i.productId.toString());

    const ing: IngForRecipe = {
      ingredient: product!,
      quantity: i.qty,
      mesurementId: i.mesurementId.toString(),
    };

    listIF.push(ing);
  }
  console.log("listIf", listIF);
  return listIF;
}

export { Calculator };
