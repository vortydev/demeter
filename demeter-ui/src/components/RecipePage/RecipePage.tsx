import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { CreateRecipeForm } from "./createRecipeForm";

function RecipePage(): JSX.Element {
  const [createRecipe, setCreateRecipe] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const [filter, setFilter] = useState<Number | null>(null);

  function success(): void {
    setSuccess(true);
    close();
  }

  function close(): void {
    setCreateRecipe(false);
  }

  return (
    <div>
      {createdSuccess && <Alert>La recette à été créer avec succès!</Alert>}

      <Button
        onClick={() => {
          setFilter(null);
        }}
        variant="secondary"
      >
        Tous
      </Button>
      <Button
        onClick={() => {
          setFilter(0);
        }}
        variant="secondary"
      >
        Boulangerie
      </Button>
      <Button
        onClick={() => {
          setFilter(1);
        }}
        variant="secondary"
      >
        Pâtisserie
      </Button>
      <Button
        onClick={() => {
          setFilter(2);
        }}
        variant="secondary"
      >
        Viennoiserie
      </Button>
      <Button
        onClick={() => {
          setFilter(3);
        }}
        variant="secondary"
      >
        Cuisine
      </Button>
      <Button
        variant="dark"
        onClick={() => {
          setCreateRecipe(true);
          setSuccess(false);
        }}
      >
        Nouvelle Recette
      </Button>
      <CreateRecipeForm show={createRecipe} close={close} success={success} />
    </div>
  );
}

export { RecipePage };
