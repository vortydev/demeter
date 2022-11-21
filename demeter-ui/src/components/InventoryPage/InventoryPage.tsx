import { useEffect, useState } from 'react';
import { Container, Row, Button, Alert } from 'react-bootstrap';
import { InventoryForm } from './InventoryAddForm';
import { InventoryUpdate } from './InventoryUpdate';
import "../../css/inventory.css";
import { VendorDisplay } from './Vendor/VendorDisplay';
import { getCookie } from 'typescript-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus, faArrowsRotate, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { getAll, deleteProduct } from '../../services/inventory.functions';
import { Product } from '../../types/Types';
import { InventoryEditProductForm } from './InventoryUpdateProduct';

function InventoryPage(): JSX.Element {
    const [createNewProduct, setCreateNewProduct] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);
    const [deletedSuccess, setDeleted] = useState<boolean>(false);
    const [updatedSuccess, setUpdated] = useState<boolean>(false);
    const [updateProducts, setUpdatedProducts] = useState<boolean>(false);
    const [vendorDisplay, setVendor] = useState<boolean>(false);

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

    const role = getCookie("role");
    return (
        <section className="invPage">
            <h1 className="pageTitle">Inventaire</h1>
            {(role === "1" || role === "4") && <div className="btnBar mt-3 mb-4">
                <Button variant="icon-outline" className="leftBtn" onClick={() => setVendor(true)}>
                    <FontAwesomeIcon className="iconList" icon={faList} size="lg" />
                    <span>Fournisseurs</span>
                </Button>
                <Button variant="icon-outline" onClick={() => {
                    setCreateNewProduct(true);
                    setSuccess(false);
                }}>
                    <FontAwesomeIcon className="iconPlus" icon={faPlus} size="lg" />
                    <span>Nouveau Produit</span>
                </Button>
            </div>
            }
            {/* <div className="invFilterBox mb-2">
                <span>filtres de l'inventaire</span>
            </div> */}
            <div className="invTable mb-2">
                {createdSuccess && <Alert variant="success">Le produit a été créé avec succès!</Alert>}
                {deletedSuccess && <Alert variant="success">Le produit a été supprimé avec succès!</Alert>}
                {updatedSuccess && <Alert variant="success">Les produits ont été mis à jour avec succès!</Alert>}
                <Container>
                    <Row className="invPageHeader mb-2">
                        <div className="invCol"><h2>Produit</h2></div>
                        <div className="invCol"><h2>Format</h2></div>
                        <div className="invColThin"><h2>Quantité</h2></div>
                    </Row>
                    <ListingProducts createSuccess={createdSuccess} setDeleteSuccess={setDeleted} deleteSuccess={deletedSuccess} setUpdateSuccess={setUpdated} updateSuccess={updatedSuccess} />
                </Container>
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

/*how to do the filter
search bar for custom researches of a product?
dropdown for categories + all
dropdown for vendor + all if time

component filter category
getAllCategories
category dropdown
when selected category change if not 0 then get products from this category
if 0 do normal

*/

export { InventoryPage };