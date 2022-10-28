import { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { ListingProducts } from './inventory';
import { InventoryForm } from './inventoryAddForm';
import { InventoryUpdate } from './inventoryUpdate';
import "../../css/inventory.css";

function InventoryPage(): JSX.Element {

    const [createNewProduct, setCreateNewProduct] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);
    const [updateProducts, setUpdatedProducts] = useState<boolean>(false);

    function success(): void {
        setSuccess(true);
        close();
    }

    function close(): void {
        setCreateNewProduct(false);
        setUpdatedProducts(false);
    }

    return (
        <section className="invPage">
            <div className="mt-2 mb-3 invAdd">
                <Button variant="outline-dark" onClick={() => {
                    setCreateNewProduct(true);
                    setSuccess(false);
                }}>Nouveau Produit</Button>
            </div>
            {/* <div className="invFilterBox mb-2">
                <span>filtres de l'inventaire</span>
            </div> */}
            <div className="invTable mb-2">
                {createdSuccess && <Alert>Le produit à été ajouté avec succès!</Alert>}
                <Container>
                    <Row className="invPageHeader mb-2">
                        <div className="invCol"><h2>Produit</h2></div>
                        <div className="invCol"><h2>Format</h2></div>
                        <div className="invColThin"><h2>Quantité</h2></div>
                    </Row>
                    <ListingProducts get={createdSuccess} />
                </Container>
            </div>
            <div className="mt-3 invUpdate">
                <Button variant="demeter-dark" onClick={() => {
                    setUpdatedProducts(true);
                    setSuccess(false);
                }}>Mettre à jour l'inventaire</Button>
            </div>
            <InventoryForm show={createNewProduct} close={close} success={success} />
            <InventoryUpdate show={updateProducts} close={close} success={success} />
        </section>
    );//<VendorForm show={createNewVendor} close={close} success={success}/>
}

export { InventoryPage };
