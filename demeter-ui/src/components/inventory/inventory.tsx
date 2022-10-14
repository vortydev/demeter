import { Row, Col, Form } from 'react-bootstrap';
import React from 'react';
import { InventoryPage } from './inventoryPage';
import { getAll, getAllCategories, getCategory } from '../../services/inventory.functions'
import { getAllVendor } from '../../services/vendor.functions';
import { Vendor } from '../../types/Types';
import { setDefaultResultOrder } from 'dns';

function ListingProducts(edit: any): JSX.Element {

    const [products, setProducts] = React.useState<any>(null);

    getAll();

    if (products !== null) {  
        if (edit == false) {
            return (
                <React.Fragment>
                    {products.map((product: any) => (
                        <ProductsDisplay product={product}/>
                    ))}
                </React.Fragment>
            );
        }
        else if(edit == true){
            return (
                <React.Fragment>
                    {products.map((product: any) => (
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

function ProductsDisplay(product:any): JSX.Element {

    return(
        <Row>
            <Col>
                {product.name}
            </Col>
            <Col>
                {product.format}
            </Col>
            <Col>
                {product.qty_inv}
            </Col>
        </Row>
    );
}

function ProductsDisplayEdit (product:any): JSX.Element {

    return(
        <Row>
            <Form.Group controlId={product.id}>
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
                        <Form.Control type="text" placeholder={product.qty_inv}/>
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
    const [categories, setCategories] = React.useState<any>(null);

    //React.useEffect(() => {
    //    fetch('/api/products/category/1')
    //        //.then(r => r.json())
    //        .then(setCategories);
    //}, []);

    //getCategory('1');

    getAllCategories();

    //<CategoryDropDown category={categories}/>
    return(
        <React.Fragment>
            <option value='1'>waiting for it</option>
        </React.Fragment>
    );
}

function GetVendors():JSX.Element {
    getAllVendor();
    return(
        <React.Fragment>
            <option value='1'>waiting for it</option>
        </React.Fragment>
    );
}

function CategoryDropDown(category:any):JSX.Element{
    return(
        <option value={category.id}>{category.name}</option>
    );
}

function vendorDropDown(vendor:any):JSX.Element{
    return(
        <option value={vendor.id}>{vendor.name}</option>
    );
}

function addProduct(e: React.SyntheticEvent): JSX.Element{
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
            qty_unit: qtyUnit.value,
            mesurement: mesurement.value,
            format: format.value,
            price: price.value,
            qty_inv: qtyInv.value
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    return(
        <InventoryPage/>
    );
}

export {ListingProducts, ProductsDisplay, ProductsDisplayEdit, editProducts, addProduct, GetCategory, CategoryDropDown, GetVendors, vendorDropDown};