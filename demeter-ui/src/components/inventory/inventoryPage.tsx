import { useState } from 'react';
import { Container, Row, Button, Alert } from 'react-bootstrap';
import { ListingProducts } from './inventory';
import { InventoryForm } from './inventoryAddForm';
import { InventoryUpdate } from './inventoryUpdate';
import "../../css/inventory.css";
import { VendorDisplay } from './Vendor/vendorDisplay';
import { getCookie } from 'typescript-cookie';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

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

export { InventoryPage };
