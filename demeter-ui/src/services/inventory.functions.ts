import InventoryService from "./inventory.services";
import { Product, Category } from "../types/Types";

function getAll(){
    InventoryService.getAll()
    .then((response: any)=>{
        console.log(response.data);
   })
   .catch((e: Error) => {
        console.log(e);
    });
}

function getCategory(id: string) {
   InventoryService.getCategory(id)
   .then((response: any)=>{
        console.log(response.data);
   })
   .catch((e: Error) => {
        console.log(e);
    });
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