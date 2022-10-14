import InventoryService from "./inventory.services";
import { Product, Category } from "../types/Types";

function getAll(){
    const products = InventoryService.getAll()
    .then((response)=>{
        return response.data;
   })
   .catch((e: Error) => {
        console.log(e);
        return [];
    });
    return products;
}

function getCategory(id: string) {
   const category = InventoryService.getCategory(id)
   .then((response)=>{
        return response.data;
   })
   .catch((e: Error) => {
        console.log(e);
        return [];
    });
    return category;
}

function getAllCategories() {
    const categories = InventoryService.getAllCategories()
    .then((response)=>{
        return response.data;
    })
    .catch((e: Error) => {
        console.log(e);
        return [];
    });

    return categories;
}

export {
    getAll,
    getCategory,
    getAllCategories,
};