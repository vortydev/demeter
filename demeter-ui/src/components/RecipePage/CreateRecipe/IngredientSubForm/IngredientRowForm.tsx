import { IngForRecipe } from "../../../../types/Types";

interface IRFProps{
    ingredient : IngForRecipe;
}
function IngredientRowForm({ingredient}: IRFProps){
    return(<div>
        {ingredient.ingredient.prodName}{ingredient.quantity}
    </div>)
}
export {IngredientRowForm};