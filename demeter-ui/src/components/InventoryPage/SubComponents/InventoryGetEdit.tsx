import React, { useState, useEffect } from "react";
import { getAllCategories, getAllMesurements } from "../../../services/inventory.functions";
import { getAllVendor } from "../../../services/vendor.functions";
import { Category, Vendor, Mesurement } from "../../../types/Types";
import { CategoryDropDownSelected, CategoryDropDown, VendorDropDownSelected, VendorDropDown, MesurementDropDownSelected, MesurementDropDown } from "./Inventory";

interface GettingShowEdit {
    show: boolean,
    id: number,
}
function GetCategoryEdit({ show, id }: GettingShowEdit): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function getList() {
            setCategories(await getAllCategories());
        }
        getList();
    }, [show]);

    const isSelected = (category: Category) => {
        if (category.id === id) {
            return <CategoryDropDownSelected category={category} />
        } else {
            return <CategoryDropDown category={category} />
        }
    }

    return (
        <React.Fragment>
            {categories.map((category) => (
                isSelected(category)
            ))}
        </React.Fragment>
    );
}

interface GettingShowEditVendor {
    show: boolean,
    id: number,
    update: boolean,
}
function GetVendorsEdit({ show, id, update }: GettingShowEditVendor): JSX.Element {
    const [vendors, setVendors] = useState<Vendor[]>([]);

    const isSelected = (vendor: Vendor) => {
        if (vendor.id === id) {
            return <VendorDropDownSelected vendor={vendor} />
        } else {
            return <VendorDropDown vendor={vendor} />
        }
    }

    useEffect(() => {
        async function getList() {
            setVendors(await getAllVendor());
        }
        getList();
    }, [show, update]);

    return (
        <React.Fragment>
            {vendors.map((vendor) => (
                isSelected(vendor)
            ))}
        </React.Fragment>
    );
}

function GetMesurementsEdit({ show, id }: GettingShowEdit): JSX.Element {
    const [mesurements, setMesurements] = useState<Mesurement[]>([]);

    useEffect(() => {
        async function getList() {
            setMesurements(await getAllMesurements());
        }
        getList();
    }, [show]);

    const isSelected = (mesurement: Mesurement) => {
        if (mesurement.id === id) {
            return <MesurementDropDownSelected mesurement={mesurement} />
        } else {
            return <MesurementDropDown mesurement={mesurement} />
        }
    }

    return (
        <React.Fragment>
            {mesurements.map((mesurement) => (
                isSelected(mesurement)
            ))}
        </React.Fragment>
    );
}

export {GetCategoryEdit, GetVendorsEdit, GetMesurementsEdit};