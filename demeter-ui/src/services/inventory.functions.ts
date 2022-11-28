import InventoryService from "./inventory.services";
import { Product } from "../types/Types";

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
         return undefined;
     });
     return product;
 }

 async function getProductsByCategory(category: string){
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

 async function getProductsByVendor(vendor: string){
    const products = InventoryService.getByVendor(vendor)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
  return products; 
 }

 async function getProductsByCategoryVendor(category: string, vendor: string){
    const products = InventoryService.getByCategoryVendor(category, vendor)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
  return products; 
 }

 async function getProductsByName(research: string){
    const products = InventoryService.getByName(research)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
  return products; 
 }

 async function getProductsByCategoryName(category: string, research: string){
    const products = InventoryService.getByCategoryName(category, research)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
  return products; 
 }

 async function getProductsByNameVendor(research: string, vendor: string){
    const products = InventoryService.getByCategoryVendor(research, vendor)
    .then((response: any) => {
      return response.data;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
  return products; 
 }

 async function getProductsByCategoryVendorName(category: string, vendor: string, research: string){
    const products = InventoryService.getByCategoryVendorName(category, vendor, research)
    .then((response: any) => {
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

function getMesurementById(id:string){
    const mesurement = InventoryService.getMesurement(id)
    .then((response)=>{
        return response.data;
    })
    .catch((e: Error) => {
        console.log(e);
        return undefined;
    });

    return mesurement;
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
    getMesurementById,
    getProductsByCategory,
    getProductsByVendor,
    getProductsByCategoryVendor,
    getProductsByName,
    getProductsByCategoryName,
    getProductsByNameVendor,
    getProductsByCategoryVendorName
};