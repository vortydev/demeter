import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { getAllCategories } from "../../../services/inventory.functions";
import { getAllVendor } from "../../../services/vendor.functions";
import { Category, Vendor } from "../../../types/Types";
import { CategoryDropDown, VendorDropDown } from "./Inventory";

interface Filter {
    setCategory: (id: string) => void;
    setVendor: (id: string) => void;
}
function FilterInventory({ setCategory, setVendor }: Filter): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);
    const categoryAll: Category = {"id": 0, "category": "Tous les produits"}
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const vendorAll: Vendor = {"id": 0, "vendor": "Tout les fournisseurs", "phone": "", "email": "", "address": ""};
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        async function getList() {
            setCategories(await getAllCategories());
            setVendors(await getAllVendor());
        }
        getList();
    }, [refresh]);
    
    function update(){
        const category = (document.getElementById("categoryFilter") as HTMLInputElement).value;
        const vendor = (document.getElementById("vendorFilter") as HTMLInputElement).value;
        setCategory(category);
        setVendor(vendor);
    }

    return (
        <React.Fragment>
            <Form>
                <Form.Group controlId="categoryFilter">
                    <Form.Select onChange={update}>
                        <CategoryDropDown category={categoryAll}/>
                        {categories.map((category) => (
                            <CategoryDropDown category={category} />
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="vendorFilter">
                    <Form.Select onChange={update}>
                        <VendorDropDown vendor={vendorAll}/>
                        {vendors.map((vendor) => (
                            <VendorDropDown vendor={vendor} />
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form>
        </React.Fragment>
    );
}

export {FilterInventory};