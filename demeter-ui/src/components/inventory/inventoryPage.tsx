import { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { ListingProducts } from './inventory';
import { InventoryForm } from './inventoryAddForm';
import { InventoryUpdate } from './inventoryUpdate';
import "../../css/inventory.css";

function InventoryPage(): JSX.Element {

    const [createNewProduct, setCreateNewProduct] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);
    const [deletedSuccess, setDeleted] = useState<boolean>(false);
    const [updatedSuccess, setUpdated] = useState<boolean>(false);
    const [updateProducts, setUpdatedProducts] = useState<boolean>(false);

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
                {createdSuccess && <Alert variant="success">Le produit a été créé avec succès!</Alert>}
                {deletedSuccess && <Alert variant="success">Le produit a été supprimé avec succès!</Alert>}
                {updatedSuccess && <Alert variant="success">Les produits ont été mis à jour avec succès!</Alert>}
                <Container>
                    <Row className="invPageHeader mb-2">
                        <div className="invCol"><h2>Produit</h2></div>
                        <div className="invCol"><h2>Format</h2></div>
                        <div className="invColThin"><h2>Quantité</h2></div>
                    </Row>
                    <ListingProducts createSuccess={createdSuccess} setDeleteSuccess={setDeleted} deleteSuccess={deletedSuccess} setUpdateSuccess={setUpdated} updateSuccess={updatedSuccess}/>
                </Container>
            </div>
            <div className="mt-3 invUpdate">
                <Button variant="demeter-dark" onClick={() => {
                    setUpdatedProducts(true);
                    setSuccess(false);
                    setUpdated(false);
                }}>Mettre à jour l'inventaire</Button>
            </div>
            <InventoryForm show={createNewProduct} close={close} success={success} />
            <InventoryUpdate show={updateProducts} close={close} success={successUpdate} />
        </section>
    );
}

export { InventoryPage };
