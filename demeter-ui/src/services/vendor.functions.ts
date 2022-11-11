import VendorService from "./vendor.services";
import { Vendor } from "../types/Types";

function getAllVendor() {
    
    const vendors = VendorService.getAll()
    .then((response)=>{
        return response.data;
    })
    .catch((e: Error) => {
        console.log(e);
        return [];
    });

    return vendors;

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

async function updateVendor(data: Vendor, id: any): Promise<boolean>{
    const vendorUpdated = VendorService.update(data,id)
    .then((response)=>{
        return true;
    })
    .catch ((e: Error)=>{
        console.log(e);
        return false;
    });
    return vendorUpdated;
}

export {
    getAllVendor,
    createVendor,
    updateVendor,
};