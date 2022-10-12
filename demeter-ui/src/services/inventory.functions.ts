import InventoryService from "./inventory.services";
import { Category } from "../types/Types";

function getCategory(id: string) {
   InventoryService.getCategory(id)
   .then((response: any)=>{
    console.log(response.data);
   })
   .catch((e: Error) => {
        console.log(e);
    });
}

export {
    getCategory,
};