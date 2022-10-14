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


async function getProductByCategory(category: number) {
    const products = InventoryService.getByCategory(category)
      .then((response: any) => {
        return response.data;
      })
      .catch((e: Error) => {
        console.log(e);
        return [];
      });
    return products;
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
    InventoryService.getAllCategories()
    .then((response: any)=>{
        console.log(response.data);
    })
    .catch((e: Error) => {
        console.log(e);
    });
}

export {
    getAll,
    getCategory,
    getAllCategories,
    getProductByCategory,
};