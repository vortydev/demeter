import { useState } from "react";
import { Button } from "react-bootstrap";
import { IngForRecipe, RawRecipe } from "../../../types/RecipeTypes.types";
import { CreateRecipeForm } from "./createRecipeForm";
import { IngredientListForm } from "./IngredientSubForm/IngredientListForm";

interface CRPProps{
    setSelectedPage: (page: string)=> void;
}


function CreateRecipePage({setSelectedPage}:CRPProps){
const [listIng, setListIng] = useState<IngForRecipe[]>([]);
const [recipeInfo, setRecipeInfo] = useState<RawRecipe>();

function handleSubmit(){
    // First Create the recipe with basic info
    // create the rel table, with recipe id +ing id
}

    return(
        <div className="createRecipePage">
            <CreateRecipeForm setRecipeInfo={setRecipeInfo}/><IngredientListForm listIng={listIng} setListIng={setListIng}/>
            <Button onClick={handleSubmit}>CRÉER LA RECETTE</Button>
        <Button onClick={()=>setSelectedPage('recipe')}>RETOUR</Button>
        </div>
    )
}

export {CreateRecipePage};