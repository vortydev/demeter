import VendorService from "./vendor.services";
import { Vendor } from "../types/Types";

function getAllVendor(){
    VendorService.getAll()
    .then((response: any)=>{
        console.log(response.data);
    })
   .catch((e: Error) => {
        console.log(e);
    });
}

export {
    getAllVendor,
};