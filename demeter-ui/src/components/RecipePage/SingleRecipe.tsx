import { Modal, Button } from "react-bootstrap";

import { Recipe } from "../../types/Types";
interface SingleRecipeProps {

    recipe : Recipe | null;
    setRecipe : (show:Recipe | null) => void;
}

function SingleRecipe({recipe, setRecipe}: SingleRecipeProps) {
    return(
        <Modal show={recipe !== null}>
            <Modal.Title>{recipe?.recipeName}<Button>edit</Button></Modal.Title>
            <div>Liste d'ingrédients (faire composante)</div> <div>calculateur (faire composante)</div>
            <Button variant="dark">Consulter les instructions</Button>
            <Button variant="danger">Supprimer</Button>
            <Button variant="primary">Imprimer</Button>
            <Button variant="dark" onClick={()=>setRecipe(null)}>retour</Button>
        </Modal>
    );
}

export {SingleRecipe}