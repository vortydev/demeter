import { useState } from 'react';
import { Container,Row, Col, Button, Alert } from 'react-bootstrap';
import { ListingProducts } from './inventory';
import { InventoryForm } from './inventoryAddForm';
import { InventoryUpdate } from './inventoryUpdate';

function InventoryPage(): JSX.Element{

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
        <div>
            <div>
                <h1>Inventaire à l'entrepot</h1>
            </div>

            <div>
                <p> truc de barre de recherche </p>
            </div>

            <div>
            {createdSuccess && <Alert variant="success">Le produit à été créer avec succès!</Alert>}
            {deletedSuccess && <Alert variant="success">Le produit a été supprimé avec succès!</Alert>}
            {updatedSuccess && <Alert variant="success">Les produits ont été mis à jour avec succès!</Alert>}
                <Container>
                    <Row>
                        <Col><h2>Produit</h2></Col>
                        <Col><h2>Format</h2></Col>
                        <Col><h2>Quantité</h2></Col>
                    </Row>
                    <ListingProducts createSuccess={createdSuccess} setDeleteSuccess={setDeleted} deleteSuccess={deletedSuccess} setUpdateSuccess={setUpdated} updateSuccess={updatedSuccess}/>
                    <Row>
                        <Button variant="dark" onClick={() => {
                          setUpdatedProducts(true);
                          setSuccess(false);
                          setUpdated(false);
                        }}>Mettre à jour l'inventaire</Button>
                    </Row>
                </Container>
            </div>

            <div>
                <Button variant="dark" onClick={() => {
                  setCreateNewProduct(true);
                  setSuccess(false);
                }}>
                Nouveau Produit
                </Button>
            </div>
            <InventoryForm show={createNewProduct} close={close} success={success}/>
            <InventoryUpdate show={updateProducts} close={close} success={successUpdate}/>
            
        </div>
    );
}

export { InventoryPage };

// wtf do I have to do now: 
// edit display delete vendor formating css add vendor form
// searchbar
// filter products
// cleanup code
// sleep
// eat
// drink water
// go to the bathroom
// breathe
// exist