import InventoryService from "./inventory.services";
import { Product, Category } from "../types/Types";
import { ProductsDisplay } from "../components/inventory/inventory";

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

function getProduct(id: string): any {
    const product = InventoryService.getProduct(id)
    .then((response)=>{
         return response.data;
    })
    .catch((e: Error) => {
         console.log(e);
         return [];
     });
     return product;
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

async function updateProduct(data: Product, id: any): Promise<boolean>{
    const productUpdated = InventoryService.update(data, id)
    .then((response)=>{
        return true;
    })
    .catch ((e: Error)=>{
        console.log(e);
        return false;
    });
    return productUpdated;
}

function deleteProduct(id: any): Promise<boolean>{
    const productDeleted = InventoryService.delete(id)
    .then((response)=>{
        return true;
    })
    .catch((e: Error)=>{
        console.log(e);
        return false;
    });
    return productDeleted;
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
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategory,
    getAllCategories,
    getAllMesurements,
};