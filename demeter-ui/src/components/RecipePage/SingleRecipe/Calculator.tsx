import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getProduct } from "../../../services/inventory.functions";
import { IngForRecipe } from "../../../types/RecipeTypes.types";
import { Ingredient } from "../../../types/Types";
import { getRecipeCost } from "../helper";

interface CalculatorProps {
  listIng: Ingredient[];
  nbUnit: number;
  otherCost: number;
}

function Calculator({ listIng, nbUnit, otherCost }: CalculatorProps) {
  const [totalCost, setTotalCost] = useState<number>(0);
  const [customNB, setCustomNB] = useState<number>(0);

  var regex1 = new RegExp(/^[0-9]+$/);
  var regex2 = new RegExp(/[0-9]+[.][0-9]{1}/);

  useEffect(() => {
    async function setTheCost() {
      const recipeCost: number = getRecipeCost(await changeIngFormat(listIng));
      const fullCost: number = recipeCost + otherCost;
      console.log(recipeCost, otherCost, typeof otherCost);
      setTotalCost(fullCost);
    }
    setTheCost();
  }, [totalCost, listIng]);

  function updateCustomNb() {
    setCustomNB(
      parseFloat(
        (document.getElementById("customNB") as HTMLInputElement).value
      )
    );
  }

  return (
    <div className="calculatorBox flex">
      <span>Coût total : {Math.round(totalCost + Number.EPSILON * 100) / 100} $</span>
      <span>Coût unitaire : {(Math.round(totalCost / nbUnit + Number.EPSILON * 100) / 100)} $</span>

      <Form className="mt-3">
        <Form.Group
          onChange={updateCustomNb}
          className="popupSelectRow flex"
          controlId="customNB"
        >
          <Form.Label className="popupSelectLabel">Nombre d'unités</Form.Label>
          <Form.Control defaultValue={0} type="number" />
        </Form.Group>
      </Form>
      <span>Coût personnalisé : {Math.round(((totalCost / nbUnit) * customNB) + Number.EPSILON * 100) / 100} $</span>
    </div>
  );
}

async function changeIngFormat(listI: Ingredient[]): Promise<IngForRecipe[]> {
  let listIF: IngForRecipe[] = [];
  for (const i of listI) {
    const product = await getProduct(i.productId.toString());

    const ing: IngForRecipe = {
      ingredient: product!,
      quantity: i.qty,
      mesurementId: i.mesurementId.toString(),
    };

    listIF.push(ing);
  }
  return listIF;
}

export { Calculator };
