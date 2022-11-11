import { useEffect, useState } from "react";
import {
  getProduct,
  getMesurementById,
} from "../../../services/inventory.functions";
import { IngForRecipe } from "../../../types/RecipeTypes.types";
import { Ingredient, Mesurement, Product } from "../../../types/Types";
import { pricePerQuantity } from "../helper";

interface IRProps {
  ingredient: Ingredient;
}
function IngredientRow({ ingredient }: IRProps) {
  const [product, setProduct] = useState<Product>();
  const [mesure, setMesure] = useState<Mesurement>();
  const [cost, setCost] = useState<number>(0.0);

  useEffect(() => {
    async function getInfos() {
      setProduct(await getProduct(ingredient.productId.toString()));
      setMesure(await getMesurementById(ingredient.mesurementId.toString()));
    }
    getInfos();
  }, []);



 useEffect(() => {
  
      if(product && mesure)
     { const ing: IngForRecipe = {
        ingredient: product!,
        quantity: ingredient.qty,
        mesurementId: ingredient.mesurementId.toString(),
      };

      setCost(pricePerQuantity(ing));}
  }, [product, mesure]);

 
  if (product && mesure) {
    return (
      <div className="editIngListRowBox flex">
        <span className="editIngListCol cellLeft">{product.name}</span>
        <span className="editIngListColS cellLeft">
          {ingredient.qty}{" "}{mesure?.mesurement}
        </span>
        <span className="editIngListColS cellLeft">{cost}$</span>
      </div>
    );
  }
  return <p>ERREUR !</p>;
}

export { IngredientRow };
