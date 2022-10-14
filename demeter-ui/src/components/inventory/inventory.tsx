import { Row, Col, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { InventoryPage } from './inventoryPage';
import { getAll, getAllCategories, getCategory } from '../../services/inventory.functions'
import { getAllVendor } from '../../services/vendor.functions';
import { Category, Product, Vendor } from '../../types/Types';
import { setDefaultResultOrder } from 'dns';

function ListingProducts(edit: any): JSX.Element {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getList() {
            setProducts(await getAll());
        }
        getList();
    });

    if (products !== null) {  
        if (edit == false) {
            return (
                <React.Fragment>
                    {products.map((product) => (
                        <ProductsDisplay product={product}/>
                    ))}
                </React.Fragment>
            );
        }
        else if(edit == true){
            return (
                <React.Fragment>
                    {products.map((product) => (
                        <ProductsDisplayEdit product={product}/>
                    ))}
                </React.Fragment>
            );
        }
    }

    return (
        <p className="text-center">You have no products item yet!</p>
    );
    
}

interface ProductDisplayProps {
    product: Product;
}

function ProductsDisplay({product}:ProductDisplayProps): JSX.Element {

    return(
        <Row>
            <Col>
                {product.name}
            </Col>
            <Col>
                {product.format}
            </Col>
            <Col>
                {product.qtyInv}
            </Col>
        </Row>
    );
}

function ProductsDisplayEdit ({product}:ProductDisplayProps): JSX.Element {

    return(
        <Row>
            <Form.Group controlId={`product${product.id}`}>
                <Col>
                    <Form.Group controlId="id">
                        <Form.Control type="hidden" value={product.id}/>
                    </Form.Group>
                    {product.name}
                </Col>
                <Col>
                    {product.format}
                </Col>
                <Col>
                    <Form.Group controlId="qty_inv">
                        <Form.Control type="text" placeholder={`${product.qtyInv}`}/>
                    </Form.Group>
                </Col>
            </Form.Group>
        </Row>
    );
}

function editProducts(e: React.SyntheticEvent){
    e.preventDefault();

    var form = document.getElementById("formMAJ") as HTMLFormElement;
    
    form.forEach((productUpdated: { id: any; qty_inv: any; }) => {
        
        const [product, setProduct] = React.useState<any>(null);

        React.useEffect(() => {
            fetch('/products/'+ productUpdated.id)
                .then(r => r.json())
                .then(setProduct);
        }, []);

        if (product !== null) {
            fetch('/products/' + productUpdated.id,{
                method: 'PUT',
                body: JSON.stringify({
                    name: product.name,
                    category: product.category,
                    vendor: product.vendor,
                    price: product.price,
                    qty_inv: productUpdated.qty_inv,
                    qty_unit: product.qty_unit,
                    mesurement: product.mesurement,
                    format: product.format
                }),
                headers: { 'Content-Type': 'application/json' },
            });
        }
    });
    
    return(
        <InventoryPage/>
    );
}

function GetCategory(): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function getList() {
            setCategories(await getAllCategories());
        }
        getList();
    });
    
    return(
        <React.Fragment>
            {categories.map((category) => (
                <CategoryDropDown category={category}/>
            ))}
        </React.Fragment>
    );
}

function GetVendors():JSX.Element {
    const [ vendors, setVendors ] = useState<Vendor[]>([]);

    useEffect(() => {
        async function getList() {
            setVendors(await getAllVendor());
        }
        getList();
    });

    return(
        <React.Fragment>
            {vendors.map((vendor) => (
                <VendorDropDown vendor={vendor}/>
            ))}
        </React.Fragment>
    );
}

interface CategorySelect {
    category: Category;
}

function CategoryDropDown({category}:CategorySelect):JSX.Element{
    return(
        <option value={category.id}>{category.category}</option>
    );
}

interface VendorSelect {
    vendor: Vendor;
}

function VendorDropDown({vendor}:VendorSelect):JSX.Element{
    return(
        <option value={vendor.id}>{vendor.vendor}</option>
    );
}

function addProduct(e: React.SyntheticEvent){
    e.preventDefault();

    const name = document.getElementById("name") as HTMLInputElement;
    const category = document.getElementById("category") as HTMLInputElement;
    const vendor = document.getElementById("vendor") as HTMLInputElement;
    const qtyUnit = document.getElementById("qty_unit") as HTMLInputElement;
    const mesurement = document.getElementById("mesurement") as HTMLInputElement;
    const format = document.getElementById("format") as HTMLInputElement;
    const price = document.getElementById("price") as HTMLInputElement;
    const qtyInv = document.getElementById("qty_inv") as HTMLInputElement;

    fetch('/products',{
        method: 'POST',
        body: JSON.stringify({
            name: name.value, 
            category: category.value, 
            vendor: vendor.value, 
            qtyUnit: qtyUnit.value,
            mesurement: mesurement.value,
            format: format.value,
            price: price.value,
            qtyInv: qtyInv.value
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    
}

export {ListingProducts, ProductsDisplay, ProductsDisplayEdit, editProducts, addProduct, GetCategory, CategoryDropDown, GetVendors, VendorDropDown};