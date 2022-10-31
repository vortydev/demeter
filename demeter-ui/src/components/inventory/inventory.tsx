import { Row, Col, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { deleteProduct, getAll, getAllCategories, getAllMesurements, getCategory } from '../../services/inventory.functions'
import { getAllVendor } from '../../services/vendor.functions';
import { Category, Mesurement, Product, Vendor } from '../../types/Types';
import { setDefaultResultOrder } from 'dns';
import { InventoryEditProductForm } from './inventoryUpdateProduct';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface Getting {
    createSuccess: boolean;
    setDeleteSuccess: (success: boolean) => void;
    deleteSuccess: boolean;
    setUpdateSuccess: (success: boolean) => void;
    updateSuccess: boolean;
}

function ListingProducts({createSuccess, setDeleteSuccess, deleteSuccess, setUpdateSuccess, updateSuccess}: Getting): JSX.Element {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getList() {
            setProducts(await getAll());
        }
        getList();
    },[createSuccess, deleteSuccess, updateSuccess]);

    //  allows the system to refresh after deleting a second product
    setTimeout(() => {
        setDeleteSuccess(false);
    }, 5000);

    return (
        <React.Fragment>
            {products.map((product) => (
                <ProductsDisplay product={product} setDeleteSuccess={setDeleteSuccess} setUpdateSuccess={setUpdateSuccess}/>
            ))}
        </React.Fragment>
    );
    
}

interface GettingShow {
    show: boolean,
}
function ListingProductsEdit(show: GettingShow): JSX.Element {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getList() {
            setProducts(await getAll());
        }
        getList();
    },[show]);

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
    setDeleteSuccess: (success: boolean) => void;
    setUpdateSuccess: (success: boolean) => void;
}

function ProductsDisplay({product, setDeleteSuccess, setUpdateSuccess}:ProductDisplayProps): JSX.Element{
    const [updateProduct, setUpdatedProduct] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);

    function success(): void {
      setSuccess(true);
      setUpdateSuccess(true);
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
                <Button onClick={()=>{setUpdatedProduct(true); setUpdateSuccess(false)}}>edit</Button>
                <Button onClick={()=>{deleteProductById(product.id); setTimeout(() => {setDeleteSuccess(true);}, 2500);}}>delete</Button>
                <InventoryEditProductForm show={updateProduct} close={close} success={success} product={product}/>
            </Col>
        </Row>
    );
}

interface ProductDisplayEditProps {
    product: Product;
}
function ProductsDisplayEdit ({product}:ProductDisplayEditProps): JSX.Element {

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
    confirmAlert({
        title: 'Confirmation',
        message: 'Êtes-vous sur de vouloir supprimer ce produit?',
        buttons: [
          {
            label: 'Oui',
            onClick: () => {deleteProduct(id);}
          },
          {
            label: 'Non',
            onClick: () => {}
          }
        ]
      });
}

function GetCategory(show: GettingShow): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function getList() {
            setCategories(await getAllCategories());
        }
        getList();
    },[show]);
    
    return(
        <React.Fragment>
            {categories.map((category) => (
                <CategoryDropDown category={category}/>
            ))}
        </React.Fragment>
    );
}

function GetVendors(show: GettingShow):JSX.Element {
    const [ vendors, setVendors ] = useState<Vendor[]>([]);

    useEffect(() => {
        async function getList() {
            setVendors(await getAllVendor());
        }
        getList();
    },[show]);

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

function GetMesurements(show: GettingShow):JSX.Element {
    const [ mesurements, setMesurements ] = useState<Mesurement[]>([]);

    useEffect(() => {
        async function getList() {
            setMesurements(await getAllMesurements());
        }
        getList();
    },[show]);

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