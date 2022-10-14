import { useState } from "react";
import { Button } from "react-bootstrap";
import { IngForRecipe, RawRecipe } from "../../../types/Types";
import { CreateRecipeForm } from "./createRecipeForm";
import { IngredientListForm } from "./IngredientSubForm/IngredientListForm";

interface CRPProps{
    setSelectedPage: (page: string)=> void;
}


function CreateRecipePage({setSelectedPage}:CRPProps){
const [listIng, setListIng] = useState<IngForRecipe[]>([]);
const [recipeInfo, setRecipeInfo] = useState<RawRecipe>();

    return(
        <div className="createRecipePage">
            <CreateRecipeForm setRecipeInfo={setRecipeInfo}/><IngredientListForm listIng={listIng} setListIng={setListIng}/>
            <Button>SendForm</Button>
        <Button onClick={()=>setSelectedPage('recipe')}>RETOUR</Button>
        </div>
    )
}

export {CreateRecipePage};