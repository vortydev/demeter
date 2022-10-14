import { Button } from "react-bootstrap";
import { IngForRecipe } from "../../../../types/Types";
import { IngredientRowForm } from "./IngredientRowForm";

interface ILFProps {
  listIng: IngForRecipe[];
  setListIng: (list: IngForRecipe[]) => void;
}

function IngredientListForm({ listIng, setListIng }: ILFProps) {
  return (
    <div className="IngListForm">
           <span>NOM | QUANTITÉ | PRIX</span>
     <div> {listIng.map((ing) => (
        <IngredientRowForm ingredient={ing} />
      ))}</div>
      <Button variant="outline-secondary">+ Ingrédient</Button>
   
    </div>
  );
}

export { IngredientListForm };
