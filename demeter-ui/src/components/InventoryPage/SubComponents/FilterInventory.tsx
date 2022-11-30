import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { getAllCategories } from "../../../services/inventory.functions";
import { getAllVendor } from "../../../services/vendor.functions";
import { Category, Vendor } from "../../../types/Types";
import { CategoryDropDown, VendorDropDown } from "./Inventory";

import { getCookie } from 'typescript-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Filter {
    setCategory: (id: string) => void;
    setVendor: (id: string) => void;
    setName: (name: string) => void;
}
function FilterInventory({ setCategory, setVendor, setName }: Filter): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);
    const categoryAll: Category = { "id": 0, "category": "Tous les produits" }
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const vendorAll: Vendor = { "id": 0, "vendor": "Tous les fournisseurs", "phone": "", "email": "", "address": "" };
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        async function getList() {
            setCategories(await getAllCategories());
            setVendors(await getAllVendor());
        }
        getList();
    }, [refresh]);

    function update() {
        const category = (document.getElementById("categoryFilter") as HTMLInputElement).value;
        const vendor = (document.getElementById("vendorFilter") as HTMLInputElement).value;
        const name = (document.getElementById("nameFilter") as HTMLInputElement).value;
        setCategory(category);
        setVendor(vendor);
        setName(name);
    }

    const role = getCookie("role");

    return (
        <React.Fragment>
            <div className={`filterBar mb-4 ${(role === "1" || role === "4") ? "mt-2" : "mt-5"}`}>
                <Form.Group className="filterSearch flex mr-1" controlId="nameFilter">
                    <FontAwesomeIcon className="icon mr-1" icon={faMagnifyingGlass} size="lg" />
                    <Form.Control onChange={update} type="text" />
                </Form.Group>

                <Form.Group className="filterDrop flex">
                    <Form.Select id="categoryFilter" onChange={update}>
                        <CategoryDropDown category={categoryAll} />
                        {categories.map((category) => (
                            <CategoryDropDown category={category} />
                        ))}
                    </Form.Select>

                    <Form.Select id="vendorFilter" onChange={update}>
                        <VendorDropDown vendor={vendorAll} />
                        {vendors.map((vendor) => (
                            <VendorDropDown vendor={vendor} />
                        ))}
                    </Form.Select>
                </Form.Group>
            </div>
        </React.Fragment>
    );
}

export { FilterInventory };