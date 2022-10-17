import { Mesurement, Product } from "./Types";

type RawRecipe ={
    title : string;
    category : number;
    instructions : string;
    otherCost: number;
    nbProductCreated: number;
}

type IngForRecipe ={
    ingredient: Product;
    quantity : number;
    mesure: Mesurement;
}

export type { RawRecipe, IngForRecipe }