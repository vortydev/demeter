import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { CreateRecipeForm } from "./createRecipeForm";

function RecipePage(): JSX.Element {

    const [createRecipe, setCreateRecipe] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);
  
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
        <h1>News Page</h1>
        <Button
          variant="secondary"
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

export {RecipePage}