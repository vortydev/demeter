import { AccountPage } from "../AccountPage/AccountPage";
import { InventoryPage } from "../inventory/inventoryPage";
import { NewsPage } from "../NewsPage/NewsPage";
import { RecipePage } from "../RecipePage/RecipePage";
import { TaskPage } from "../TaskPage/TaskPage";

interface BodyDemeterProps {
  selected: string;
}

function BodyDemeter({ selected }: BodyDemeterProps) {
  switch (selected) {
    case "news":
      return (<NewsPage />);
    case "task":
      return (<TaskPage />);
    case "recipe":
      return (<RecipePage />);
    case "inventory":
      return (<InventoryPage />);
    case "accounts":
      return (<AccountPage />);
    default:
        return (<div>404 Uh... that's weird. Page not found.</div>);
  }
}

export { BodyDemeter };
