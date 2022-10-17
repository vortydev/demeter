import { IngForRecipe } from "../../../../types/RecipeTypes.types";

interface IRFProps{
    ingredient : IngForRecipe;
}
function IngredientRowForm({ingredient}: IRFProps){
    return(<div>
        {ingredient.ingredient.name}{ingredient.quantity}
    </div>)
}
export {IngredientRowForm};