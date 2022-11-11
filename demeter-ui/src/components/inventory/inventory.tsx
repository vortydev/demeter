import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { deleteProduct, getAll, getAllCategories, getAllMesurements, getProductsByCategory } from '../../services/inventory.functions'
import { getAllVendor } from '../../services/vendor.functions';
import { Category, Mesurement, Product, Vendor } from '../../types/Types';
import { InventoryEditProductForm } from './inventoryUpdateProduct';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface Getting {
    createSuccess: boolean;
    setDeleteSuccess: (success: boolean) => void;
    deleteSuccess: boolean;
    setUpdateSuccess: (success: boolean) => void;
    updateSuccess: boolean;
}

function ListingProducts({ createSuccess, setDeleteSuccess, deleteSuccess, setUpdateSuccess, updateSuccess }: Getting): JSX.Element {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getList() {
            setProducts(await getAll());
        }
        getList();
    }, [createSuccess, deleteSuccess, updateSuccess]);

    //  allows the system to refresh after deleting a second product
    setTimeout(() => {
        setDeleteSuccess(false);
    }, 5000);

    return (
        <React.Fragment>
            {products.map((product) => (
                <ProductsDisplay product={product} setDeleteSuccess={setDeleteSuccess} setUpdateSuccess={setUpdateSuccess} />
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
            setProducts(await getProductsByCategory("2"));
        }
        getList();
    }, [show]);

    return (
        <React.Fragment>
            {products.map((product) => (
                <ProductsDisplayEdit product={product} />
            ))}
        </React.Fragment>
    );

}

interface ProductDisplayProps {
    product: Product;
    setDeleteSuccess: (success: boolean) => void;
    setUpdateSuccess: (success: boolean) => void;
}

function ProductsDisplay({ product, setDeleteSuccess, setUpdateSuccess }: ProductDisplayProps): JSX.Element {
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

    return (
        <div className="flex cellShade mb-1">
            <div className="invCol cellCenter">
                <p>{product.name}</p>
            </div>
            <div className="invCol cellCenter">
                <p>{product.format}</p>
            </div>
            <div className="invColThin cellCenter flexInvQt">
                <p>{product.qtyInv}</p>

                <div className="invEditBox">
                    <FontAwesomeIcon className="iconEdit cursor" icon={faEdit} size="lg" onClick={() => {
                        setUpdatedProduct(true);
                        setUpdateSuccess(false);
                    }} />
                    <FontAwesomeIcon className="iconTrash cursor" icon={faTrashAlt} size="lg" onClick={() => {
                        confirmAlert({
                            title: 'Confirmation',
                            message: 'Êtes-vous sur de vouloir supprimer ce produit?',
                            buttons: [
                                {
                                    label: 'Supprimer',
                                    onClick: () => { deleteProduct(product.id); setDeleteSuccess(true); }
                                },
                                {
                                    label: 'Annuler',
                                    onClick: () => { }
                                }
                            ]
                        });
                    }} />
                </div>
            </div>

            <InventoryEditProductForm show={updateProduct} close={close} success={success} product={product} />
        </div>
    );
}

interface ProductDisplayEditProps {
    product: Product;
}

function ProductsDisplayEdit({ product }: ProductDisplayEditProps): JSX.Element {

    return (
        <Form.Group className="flex cellShade mb-1" controlId={`product${product.id}`}>
            <Form.Group controlId={`product${product.id}`}>
                <Form.Control type="hidden" value={product.id} />
            </Form.Group>

            <div className="invMAJrowLarge cellCenter">
                {product.name}
            </div>

            <div className="invMAJrowLarge cellCenter">
                {product.format}
            </div>

            <Form.Group className="invMAJrowThin" controlId={`qty_inv${product.id}`}>
                <Form.Control type="text" defaultValue={`${product.qtyInv}`} />
            </Form.Group>
        </Form.Group>
    );
}
interface GettingShowEdit {
    show: boolean,
    id: number,
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

function GetVendors(show: GettingShow): JSX.Element {
    const [vendors, setVendors] = useState<Vendor[]>([]);

    useEffect(() => {
        async function getList() {
            setVendors(await getAllVendor());
        }
        getList();
    }, [show]);

    return (
        <React.Fragment>
            {vendors.map((vendor) => (
                <VendorDropDown vendor={vendor} />
            ))}
        </React.Fragment>
    );
}

function GetVendorsEdit({ show, id }: GettingShowEdit): JSX.Element {
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
    }, [show]);

    return (
        <React.Fragment>
            {vendors.map((vendor) => (
                isSelected(vendor)
            ))}
        </React.Fragment>
    );
}

interface CategorySelect {
    category: Category;
}

function CategoryDropDown({ category }: CategorySelect): JSX.Element {
    return (
        <option value={category.id}>{category.category}</option>
    );
}

function CategoryDropDownSelected({ category }: CategorySelect): JSX.Element {
    return (
        <option value={category.id} selected>{category.category}</option>
    );
}

interface VendorSelect {
    vendor: Vendor;
}

function VendorDropDown({ vendor }: VendorSelect): JSX.Element {
    return (
        <option value={vendor.id}>{vendor.vendor}</option>
    );
}

function VendorDropDownSelected({ vendor }: VendorSelect): JSX.Element {
    return (
        <option value={vendor.id} selected>{vendor.vendor}</option>
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

interface MesurementSelect {
    mesurement: Mesurement;
}

function MesurementDropDown({ mesurement }: MesurementSelect): JSX.Element {
    return (
        <option value={mesurement.id}>{mesurement.mesurement}</option>
    );
}

function MesurementDropDownSelected({ mesurement }: MesurementSelect): JSX.Element {
    return (
        <option value={mesurement.id} selected>{mesurement.mesurement}</option>
    );
}

export { ListingProducts, ListingProductsEdit, ProductsDisplay, ProductsDisplayEdit, GetCategory, GetCategoryEdit, CategoryDropDown, GetVendors, GetVendorsEdit, VendorDropDown, GetMesurements, GetMesurementsEdit };
