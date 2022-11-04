import { AccountPage } from "../AccountPage/AccountPage";
import { InventoryPage } from "../inventory/inventoryPage";
import { NewsPage } from "../NewsPage/NewsPage";
import { CreateRecipePage } from "../RecipePage/CreateRecipe/CreateRecipePage";
import { RecipePage } from "../RecipePage/RecipePage";
import { SingleRecipePage } from "../RecipePage/SingleRecipe/SingleRecipePage";
import { TaskPage } from "../TaskPage/TaskPage";
import { Recipe } from "../../types/Types";
import { useState } from "react";

interface BodyDemeterProps {
  selected: string;
  setSelected: (pageOn: string) => void;
}

function BodyDemeter({ selected, setSelected }: BodyDemeterProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipeCreated, setRecipeCreated] = useState<boolean>(false);
  const [recipeDeleted, setRecipeDeleted] = useState<boolean>(false);

  switch (selected) {
    case "news":
      return <NewsPage />;
    case "task":
      return <TaskPage />;
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
        />
      );
    case "SingleRecipe":
      return (
        <SingleRecipePage
          setSelectedPage={setSelected}
          recipe={recipe}
          setRecipe={setRecipe}
          setRecipeDeleted={setRecipeDeleted}
        />
      );
    case "CreateRecipe":
      return (
        <CreateRecipePage
          setCreated={setRecipeCreated}
          setSelectedPage={setSelected}
        />
      );
    case "inventory":
      return <InventoryPage />;
    case "accounts":
      return <AccountPage />;
    default:
      return <div>404 Uh... that's weird. Page not found.</div>;
  }
}

export { BodyDemeter };
