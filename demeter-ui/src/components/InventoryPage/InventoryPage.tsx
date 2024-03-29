import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { InventoryForm } from './InventoryAddForm';
import { InventoryUpdate } from './InventoryUpdate';
import "../../css/inventory.css";
import { VendorDisplay } from './Vendor/VendorDisplay';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus, faArrowsRotate, faEdit, faTrashAlt, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from 'react-confirm-alert';
import { getAll, deleteProduct, getProductsByCategory, getProductsByVendor, getProductsByCategoryVendor, getProductsByName, getProductsByCategoryName, getProductsByNameVendor, getProductsByCategoryVendorName } from '../../services/inventory.functions';
import { Product } from '../../types/Types';
import { InventoryEditProductForm } from './InventoryUpdateProduct';
import { FilterInventory } from './SubComponents/FilterInventory';
import { InventoryInvoiceButton } from './SubComponents/InventoryRapport';
import { setCookiePage } from '../../services/cookie.functions';

interface InventoryPageProps{
    role: string;
}
function InventoryPage({role}:InventoryPageProps): JSX.Element {
    const [createNewProduct, setCreateNewProduct] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);
    const [deletedSuccess, setDeleted] = useState<boolean>(false);
    const [updatedSuccess, setUpdated] = useState<boolean>(false);
    const [updateProducts, setUpdatedProducts] = useState<boolean>(false);
    const [vendorDisplay, setVendor] = useState<boolean>(false);
    const [categoryFilter, setCategoryFilter] = useState<string>("0");
    const [vendorFilter, setVendorFilter] = useState<string>("0");
    const [nameFilter, setNameFilter] = useState<string>("");

    function success(): void {
        setSuccess(true);
        close();
    }

    function successUpdate(): void {
        setUpdated(true);
        close();
    }

    function close(): void {
        setCreateNewProduct(false);
        setUpdatedProducts(false);
        setVendor(false);
    }

    setTimeout(() => {
        setSuccess(false);
        setUpdated(false);
        setDeleted(false);
    }, 5000);

    return (
        <section className="appPage">
            {(role === "1" || role === "4") && <div className="btnBar mt-5 mb-4">
                <Button variant="icon-outline" onClick={() => setVendor(true)}>
                    <FontAwesomeIcon className="iconList" icon={faList} size="lg" />
                    <span>Fournisseurs</span>
                </Button>
                <Button variant="icon-outline" className="centerBtn" onClick={() => {
                    setCreateNewProduct(true);
                    setSuccess(false);
                }}>
                    <FontAwesomeIcon className="iconPlus" icon={faPlus} size="lg" />
                    <span>Nouveau Produit</span>
                </Button>
                <InventoryInvoiceButton />
            </div>}

            <FilterInventory setCategory={setCategoryFilter} setVendor={setVendorFilter} setName={setNameFilter} role={role} />

            <div className="invTable mb-2">
                {createdSuccess && <Alert variant="success">Le produit a été créé avec succès !</Alert>}
                {deletedSuccess && <Alert variant="success">Le produit a été supprimé avec succès !</Alert>}
                {updatedSuccess && <Alert variant="success">Les produits ont été mis à jour avec succès !</Alert>}

                <div className="invPageHeader mb-2 flex">
                    <div className="invCol"><h2>Produit</h2></div>
                    <div className="invCol"><h2>Format</h2></div>
                    <div className="invColThin"><h2>Quantité</h2></div>
                </div>

                <ListingProducts createSuccess={createdSuccess} setDeleteSuccess={setDeleted} deleteSuccess={deletedSuccess} setUpdateSuccess={setUpdated} updateSuccess={updatedSuccess} categoryFilter={categoryFilter} vendorFilter={vendorFilter} nameFilter={nameFilter} />
            </div>

            <div className="btnBar mt-3">
                <Button variant="icon-dark" className="centerBtn" onClick={() => {
                    setUpdatedProducts(true);
                    setSuccess(false);
                    setUpdated(false);
                }}>
                    <FontAwesomeIcon className="icon" icon={faArrowsRotate} size="lg" />
                    <span>Mettre à jour l'inventaire</span>
                </Button>
            </div>

            <InventoryForm show={createNewProduct} close={close} success={success} />
            <InventoryUpdate show={updateProducts} close={close} success={successUpdate} />
            <VendorDisplay show={vendorDisplay} close={close} />
        </section>
    );
}

interface Getting {
    createSuccess: boolean;
    setDeleteSuccess: (success: boolean) => void;
    deleteSuccess: boolean;
    setUpdateSuccess: (success: boolean) => void;
    updateSuccess: boolean;
    categoryFilter: string;
    vendorFilter: string;
    nameFilter: string;
}

function ListingProducts({ createSuccess, setDeleteSuccess, deleteSuccess, setUpdateSuccess, updateSuccess, categoryFilter, vendorFilter, nameFilter }: Getting): JSX.Element {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function getList() {
            if (categoryFilter === "0" && vendorFilter === "0" && nameFilter === "") {
                setProducts(await getAll());
            }
            else if (categoryFilter !== "0" && vendorFilter !== "0" && nameFilter !== "") {
                setProducts(await getProductsByCategoryVendorName(categoryFilter, vendorFilter, nameFilter));
            }
            else if (categoryFilter !== "0" && vendorFilter !== "0") {
                setProducts(await getProductsByCategoryVendor(categoryFilter, vendorFilter));
            }
            else if (categoryFilter !== "0" && nameFilter !== "") {
                setProducts(await getProductsByCategoryName(categoryFilter, nameFilter));
            }
            else if (nameFilter !== "" && vendorFilter !== "0") {
                setProducts(await getProductsByNameVendor(nameFilter, vendorFilter));
            }
            else if (categoryFilter !== "0") {
                setProducts(await getProductsByCategory(categoryFilter));
            }
            else if (vendorFilter !== "0") {
                setProducts(await getProductsByVendor(vendorFilter));
            }
            else if (nameFilter !== "") {
                setProducts(await getProductsByName(nameFilter));
            }
        }
        getList();
    }, [createSuccess, deleteSuccess, updateSuccess, categoryFilter, vendorFilter, nameFilter]);

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

    setCookiePage('inventory');

    return (
        <article>
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
            <hr className="taskLine" />
        </article>
    );
}

export { InventoryPage };