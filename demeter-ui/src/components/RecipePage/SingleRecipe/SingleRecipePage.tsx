import { Button } from "react-bootstrap";
import { Recipe } from "../../../types/Types";

interface SingleRecipePageProps {
  recipe: Recipe | null;
  setSelectedPage: (page: string) => void;
}
//add setRecipe null on retour
function SingleRecipePage({ recipe, setSelectedPage }: SingleRecipePageProps) {
  return (
    <div>
      woot woot {recipe!.title}
      <Button onClick={() => setSelectedPage("recipe")} variant="dark"> 
        RETOUR
      </Button>
    </div>
  );
}

export {SingleRecipePage};
