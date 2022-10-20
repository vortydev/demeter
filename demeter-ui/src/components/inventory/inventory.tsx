import { Row, Col, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { deleteProduct, getAll, getAllCategories, getAllMesurements, getCategory } from '../../services/inventory.functions'
import { getAllVendor } from '../../services/vendor.functions';
import { Category, Mesurement, Product, Vendor } from '../../types/Types';
import { setDefaultResultOrder } from 'dns';
import { InventoryEditProductForm } from './inventoryUpdateProduct';

interface Getting {
    get: boolean,
}
function ListingProducts(get: Getting): JSX.Element {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getList() {
            setProducts(await getAll());
        }
        getList();
    },[get]);

    return (
        <React.Fragment>
            {products.map((product) => (
                <ProductsDisplay product={product}/>
            ))}
        </React.Fragment>
    );
    
}

function ListingProductsEdit(get: Getting): JSX.Element {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getList() {
            setProducts(await getAll());
        }
        getList();
    },[get]);

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

function ProductsDisplay({product}:ProductDisplayProps): JSX.Element{
    const [updateProduct, setUpdatedProduct] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);

    function success(): void {
      setSuccess(true);
      close();
    }

    function close(): void {
      setUpdatedProduct(false);
    }

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
                <Button onClick={()=>{setUpdatedProduct(true)}}>edit</Button>
                <Button onClick={()=>deleteProductById(product.id)}>delete</Button>
                <InventoryEditProductForm show={updateProduct} close={close} success={success} product={product}/>
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
                    <Form.Group controlId={`qty_inv${product.id}`}>
                        <Form.Control type="text" defaultValue={`${product.qtyInv}`}/>
                    </Form.Group>
                </Col>
            </Form.Group>
        </Row>
    );
}

function deleteProductById(id: any){
    if (window.confirm('Êtes-vous sur de vouloir supprimer ce produit?')){
        deleteProduct(id);
    }
}

function GetCategory(get: Getting): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function getList() {
            setCategories(await getAllCategories());
        }
        getList();
    },[get]);
    
    return(
        <React.Fragment>
            {categories.map((category) => (
                <CategoryDropDown category={category}/>
            ))}
        </React.Fragment>
    );
}

function GetVendors(get: Getting):JSX.Element {
    const [ vendors, setVendors ] = useState<Vendor[]>([]);

    useEffect(() => {
        async function getList() {
            setVendors(await getAllVendor());
        }
        getList();
    },[get]);

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

function GetMesurements(get: Getting):JSX.Element {
    const [ mesurements, setMesurements ] = useState<Mesurement[]>([]);

    useEffect(() => {
        async function getList() {
            setMesurements(await getAllMesurements());
        }
        getList();
    },[get]);

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

export {ListingProducts, ListingProductsEdit, ProductsDisplay, ProductsDisplayEdit, GetCategory, CategoryDropDown, GetVendors, VendorDropDown, GetMesurements};