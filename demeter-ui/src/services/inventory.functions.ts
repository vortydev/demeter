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

async function createProduct(data:Product): Promise<boolean>{
    const productCreated = InventoryService.create(data)
    .then((product) => {
        return true;
    })
    .catch((e: Error) => {
        console.log(e);
        return false;
    });
    return productCreated;
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

function getAllMesurements() {
    const mesurements = InventoryService.getAllMesurements()
    .then((response)=>{
        return response.data;
    })
    .catch((e: Error) => {
        console.log(e);
        return [];
    });

    return mesurements;
}

export {
    getAll,
    createProduct,
    getCategory,
    getAllCategories,
    getAllMesurements,
};