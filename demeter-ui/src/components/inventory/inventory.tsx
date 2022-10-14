import { Row, Col, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { InventoryPage } from './inventoryPage';
import { getAll, getAllCategories, getAllMesurements, getCategory } from '../../services/inventory.functions'
import { getAllVendor } from '../../services/vendor.functions';
import { Category, Mesurement, Product, Vendor } from '../../types/Types';
import { setDefaultResultOrder } from 'dns';

function ListingProducts(): JSX.Element {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getList() {
            setProducts(await getAll());
        }
        getList();
    });

    return (
        <React.Fragment>
            {products.map((product) => (
                <ProductsDisplay product={product}/>
            ))}
        </React.Fragment>
    );
    
}

function ListingProductsEdit(): JSX.Element {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getList() {
            setProducts(await getAll());
        }
        getList();
    });

    return (
        <React.Fragment>
            {products.map((product) => (
                <ProductsDisplayEdit product={product}/>
            ))}
        </React.Fragment>
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

function GetMesurements():JSX.Element {
    const [ mesurements, setMesurements ] = useState<Mesurement[]>([]);

    useEffect(() => {
        async function getList() {
            setMesurements(await getAllMesurements());
        }
        getList();
    });

    return(
        <React.Fragment>
            {mesurements.map((mesurement) => (
                <MesurementDropDown mesurement={mesurement}/>
            ))}
        </React.Fragment>
    );
}

interface MesurementSelect {
    mesurement: Mesurement;
}

function MesurementDropDown({mesurement}:MesurementSelect):JSX.Element{
    return(
        <option value={mesurement.id}>{mesurement.mesurement}</option>
    );
}

export {ListingProducts, ListingProductsEdit, ProductsDisplay, ProductsDisplayEdit, editProducts, GetCategory, CategoryDropDown, GetVendors, VendorDropDown, GetMesurements};