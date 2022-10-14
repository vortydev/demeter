import { IngForRecipe } from "../../../types/Types"

interface IRFProps{
    ingredient : IngForRecipe;
}
function IngredientRowForm({ingredient}: IRFProps){
    return(<div>
        {ingredient.ingredient.ingName}{ingredient.quantity}
    </div>)
}
export {IngredientRowForm};