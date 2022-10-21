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
    mesurementId: string;
}

export type { RawRecipe, IngForRecipe }