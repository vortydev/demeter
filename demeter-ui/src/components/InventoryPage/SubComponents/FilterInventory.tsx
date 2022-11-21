import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { getAllCategories } from "../../../services/inventory.functions";
import { Category } from "../../../types/Types";
import { CategoryDropDown } from "./Inventory";

interface Filter {
    setCategory: (id: string) => void;
}
function FilterInventory({ setCategory }: Filter): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);
    const categoryAll: Category = {"id": 0, "category": "Tous les produits"}

    useEffect(() => {
        async function getList() {
            setCategories(await getAllCategories());
        }
        getList();
    }, [categoryAll]);
    
    function updateCategory(){
        const category = (document.getElementById("categoryFilter") as HTMLInputElement).value;
        setCategory(category);
    }

    return (
        <React.Fragment>
            <Form>
                <Form.Group controlId="categoryFilter">
                    <Form.Select onChange={updateCategory}>
                        <CategoryDropDown category={categoryAll}/>
                        {categories.map((category) => (
                            <CategoryDropDown category={category} />
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form>
        </React.Fragment>
    );
}

export {FilterInventory};