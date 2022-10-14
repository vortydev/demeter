import VendorService from "./vendor.services";
import { Vendor } from "../types/Types";
import { useState } from "react";

function getAllVendor(): Array<any> {
    const [vendors, setVendors] = useState<Array<any>>([{null: null}]);
    VendorService.getAll()
    .then((response)=>{
        console.log(response.data);
        setVendors(response.data);
        return (response.data);
    })
    .catch((e: Error) => {
        console.log(e);
        return false;
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

export {
    getAllVendor,
    createVendor,
};