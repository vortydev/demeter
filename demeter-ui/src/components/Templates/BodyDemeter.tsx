import { AccountPage } from "../AccountPage/AccountPage";
import { InventoryPage } from "../InventoryPage/InventoryPage";
import { NewsPage } from "../NewsPage/NewsPage";
import { CreateRecipePage } from "../RecipePage/CreateRecipe/CreateRecipePage";
import { RecipePage } from "../RecipePage/RecipePage";
import { SingleRecipePage } from "../RecipePage/SingleRecipe/SingleRecipePage";
import { TaskPage } from "../TaskPage/TaskPage";
import { Recipe } from "../../types/Types";
import { useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';

interface BodyDemeterProps {
  selected: string;
  setSelected: (pageOn: string) => void;
  role: string;
  account: string;
}

function BodyDemeter({ selected, setSelected, role, account }: BodyDemeterProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipeCreated, setRecipeCreated] = useState<boolean>(false);
  const [recipeDeleted, setRecipeDeleted] = useState<boolean>(false);

  switch (selected) {
    case "news":
      return <NewsPage role={role} account={account}/>;
    case "task":
      return <TaskPage role={role} account={account}/>;
    case "recipe":
      return (
        <RecipePage
          setDeletedSuccess={setRecipeDeleted}
          setCreatedSuccess={setRecipeCreated}
          createdSuccess={recipeCreated}
          deletedSuccess={recipeDeleted}
          selectedPage={selected}
          setSelectedPage={setSelected}
          setRecipePage={setRecipe}
          role={role}
        />
      );
    case "SingleRecipe":
      return (
        <SingleRecipePage
          setSelectedPage={setSelected}
          recipe={recipe}
          setRecipe={setRecipe}
          setRecipeDeleted={setRecipeDeleted}
          role={role}
        />
      );
    case "CreateRecipe":
      return (
        <CreateRecipePage
          setCreated={setRecipeCreated}
          setSelectedPage={setSelected}
          role={role}
        />
      );
    case "inventory":
      return <InventoryPage role={role}/>;
    case "accounts":
      return <AccountPage />;
    default:
      return <div className="mt-3">404 Uh... that's weird. Page not found.</div>;
  }
}

export { BodyDemeter };
