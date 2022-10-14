import { useState } from 'react';
import { Container,Row, Col, Button, Alert } from 'react-bootstrap';
import { ListingProducts } from './inventory';
import { InventoryForm } from './inventoryAddForm';
import { VendorForm } from './inventoryAddVendorForm';
import { InventoryUpdate } from './inventoryUpdate';

function InventoryPage(): JSX.Element{
    const edit = false;

    const [createNewProduct, setCreateNewProduct] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);
    const [updateProducts, setUpdatedProducts] = useState<boolean>(false);
    //const [createNewVendor, setCreateNewVendor] = useState<boolean>(false);
  
    function success(): void {
      setSuccess(true);
      close();
    }
  
    function close(): void {
      setCreateNewProduct(false);
      setUpdatedProducts(false);
      //setCreateNewVendor(false);
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
            {createdSuccess && <Alert>Le produit à été créer avec succès!</Alert>}
                <Container>
                    <Row>
                        <Col><h2>Produit</h2></Col>
                        <Col><h2>Format</h2></Col>
                        <Col><h2>Quantité</h2></Col>
                    </Row>
                    <ListingProducts edit={edit}/>
                    <Row>
                        <Button variant="dark" onClick={() => {
                          setUpdatedProducts(true);
                          setSuccess(false);
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
            <InventoryUpdate show={updateProducts} close={close} success={success}/>
            
        </div>
    );//<VendorForm show={createNewVendor} close={close} success={success}/>
}

export { InventoryPage };

// wtf do I have to do now: 
// searchbar
// edit 1 product
// delete 1 product
// edit delete buttons
// filter products
// add vendor
// correct inventoryAddForm category
// correct inventory display
// sleep
// eat
// drink water
// go to the bathroom
// breathe
// exist