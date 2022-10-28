import { useEffect, useState } from "react";
import { getProduct, getMesurementById } from "../../../services/inventory.functions";
import { IngForRecipe } from "../../../types/RecipeTypes.types";
import { Ingredient, Mesurement, Product } from "../../../types/Types";
import { pricePerQuantity } from "../helper";

interface IRProps {
    ingredient: Ingredient;
  }
  function IngredientRow({ ingredient }: IRProps) {
    const [product, setProduct] = useState<Product>();
    const [mesure, setMesure] = useState<Mesurement>();
  
    const ing: IngForRecipe = {
      ingredient: product!,
      quantity: ingredient.qty,
      mesurementId: ingredient.mesurementId.toString(),
    };
  
    useEffect(() => {
      async function getInfos() {
        setProduct(await getProduct(ingredient.productId.toString()));
        setMesure(await getMesurementById(ingredient.mesurementId.toString()));
      }
      getInfos();
    }, []);
  
  
    const cost = pricePerQuantity(ing);
    
    if (product && mesure) {
      return (
        <div>
          <span> {product.name}</span>
          <span>
            {ingredient.qty}
            {mesure?.mesurement}
          </span>
          <span>{cost}$</span>
        </div>
      );
    }
      return(<p>ERREUR !</p>);
    
  }

  export {IngredientRow}