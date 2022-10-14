import { Recipe } from "../../types/Types";
import { AccountPage } from "../AccountPage/AccountPage";
import { InventoryPage } from "../inventory/inventoryPage";
import { NewsPage } from "../NewsPage/NewsPage";
import { CreateRecipePage } from "../RecipePage/CreateRecipe/CreateRecipePage";
import { RecipePage } from "../RecipePage/RecipePage";
import { SingleRecipePage } from "../RecipePage/SingleRecipe/SingleRecipePage";
import { TaskPage } from "../TaskPage/TaskPage";


interface BodyDemeterProps {
  selected: string;
  setSelected: (pageOn: string) => void;
  recipe : Recipe | null;
  setRecipe: (recipe: Recipe| null)=> void;
}

function BodyDemeter({ selected, setSelected, recipe, setRecipe }: BodyDemeterProps) {

  switch (selected) {
    case "news":
      return (<NewsPage />);
    case "task":
      return (<TaskPage />);
    case "recipe":
      return (<RecipePage setSelectedPage={setSelected} setRecipePage={setRecipe}/>);
    case "SingleRecipe":
      return(<SingleRecipePage setSelectedPage={setSelected} recipe={recipe}/>);
    case"CreateRecipe" : 
    return(<CreateRecipePage setSelectedPage={setSelected}/>);
    case "inventory":
      return (<InventoryPage />);
    case "accounts":
      return (<AccountPage />);
    default:
        return (<div>Uh, Somehow, you got lost...</div>);
  }
}

export { BodyDemeter };
