import { IngForRecipe } from "../../../../types/Types";

interface IRFProps{
    ingredient : IngForRecipe;
}
function IngredientRowForm({ingredient}: IRFProps){
    return(<div>
        {ingredient.ingredient.name}{ingredient.quantity}
    </div>)
}
export {IngredientRowForm};