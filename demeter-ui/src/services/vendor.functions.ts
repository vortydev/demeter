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

async function createVendor(data: Vendor): Promise<boolean>{
    const vendorCreated = VendorService.create(data)
    .then((vendor) => {
        return true;
    })
    .catch((e: Error) => {
        console.log(e);
        return false;
    });
    return vendorCreated;
}

export {
    getAllVendor,
    createVendor,
};