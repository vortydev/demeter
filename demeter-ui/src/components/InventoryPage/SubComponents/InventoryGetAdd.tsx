import React, { useState, useEffect } from "react";
import { getAllCategories, getAllMesurements } from "../../../services/inventory.functions";
import { getAllVendor } from "../../../services/vendor.functions";
import { Category, Vendor, Mesurement } from "../../../types/Types";
import { CategoryDropDown, VendorDropDown, MesurementDropDown } from "./Inventory";

interface GettingShow {
    show: boolean,
}
function GetCategory(show: GettingShow): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function getList() {
            setCategories(await getAllCategories());
        }
        getList();
    }, [show]);

    return (
        <React.Fragment>
            {categories.map((category) => (
                <CategoryDropDown category={category} />
            ))}
        </React.Fragment>
    );
}

interface GettingShowVendor {
    show: boolean,
    update: boolean
}
function GetVendors({ show, update }: GettingShowVendor): JSX.Element {
    const [vendors, setVendors] = useState<Vendor[]>([]);

    useEffect(() => {
        async function getList() {
            setVendors(await getAllVendor());
        }
        getList();
    }, [show, update]);

    return (
        <React.Fragment>
            {vendors.map((vendor) => (
                <VendorDropDown vendor={vendor} />
            ))}
        </React.Fragment>
    );
}

function GetMesurements(show: GettingShow): JSX.Element {
    const [mesurements, setMesurements] = useState<Mesurement[]>([]);

    useEffect(() => {
        async function getList() {
            setMesurements(await getAllMesurements());
        }
        getList();
    }, [show]);

    return (
        <React.Fragment>
            {mesurements.map((mesurement) => (
                <MesurementDropDown mesurement={mesurement} />
            ))}
        </React.Fragment>
    );
}

export { GetCategory, GetVendors, GetMesurements };