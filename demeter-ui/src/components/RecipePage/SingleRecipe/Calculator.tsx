import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getProduct } from "../../../services/inventory.functions";
import { IngForRecipe } from "../../../types/RecipeTypes.types";
import { Ingredient } from "../../../types/Types";
import { getRecipeCost, adjustPrice } from "../helper";

interface CalculatorProps {
  listIng: Ingredient[];
  nbUnit: number;
  otherCost: number;
  editSuccess: boolean;
}

function Calculator({
  listIng,
  nbUnit,
  otherCost,
  editSuccess,
}: CalculatorProps) {
  const [customNB, setCustomNB] = useState<number>(0);
  const [coutTotal, setCoutTotal] = useState<string>("0");
  const [coutUnitaire, setCoutUnitaire] = useState<string>("0");
  const [coutPerso, setCoutPerso] = useState<string>("0");

  useEffect(() => {
    async function setTheCost() {
      const recipeCost: number = getRecipeCost(await changeIngFormat(listIng));
      const fullCost: number = recipeCost + otherCost;
      console.log(recipeCost, "+", otherCost, "=", fullCost);

      setCoutTotal(adjustPrice(fullCost));
      setCoutUnitaire(adjustPrice(fullCost / nbUnit));
      setCoutPerso(adjustPrice((fullCost / nbUnit) * customNB));
    }
    setTheCost();
  }, [coutTotal, listIng, editSuccess, customNB]);

  function updateCustomNb() {
    setCustomNB(
      parseFloat(
        (document.getElementById("customNB") as HTMLInputElement).value
      )
    );
  }

  return (
    <div className="calculatorBox flex">
      <span>Coût total : {coutTotal} $</span>
      <span>Coût unitaire : {coutUnitaire} $</span>

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
      <span>Coût personnalisé : {coutPerso} $</span>
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

export { Calculator};
