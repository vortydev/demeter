import { Container,Row, Col, Button } from 'react-bootstrap';
import { ListingProducts, openProductForm, updateInventory} from './inventory';

function InventoryPage(): JSX.Element{
    const edit = false;
    return (
        <div>
            <div>
                <h1>Inventaire à l'entrepot</h1>
            </div>

            <div>
                <p> truc de barre de recherche </p>
            </div>

            <div>
                <Container>
                    <Row>
                        <Col><h2>Produit</h2></Col>
                        <Col><h2>Format</h2></Col>
                        <Col><h2>Quantité</h2></Col>
                    </Row>
                    <ListingProducts edit={edit}/>
                    <Row>
                        <Button variant="dark" onClick={updateInventory}>Mettre à jour l'inventaire</Button>
                    </Row>
                </Container>
            </div>

            <div>
                <Button variant="dark" onClick={openProductForm}>Nouveau Produit</Button>
            </div>


        </div>
    );
}

export { InventoryPage };

// wtf do I have to do now: 
// searchbar
// edit 1 product
// delete 1 product
// edit delete buttons
// filter products
// add vendor
// add category
// view category
// correct inventoryAddForm for vendor and category
// delete category
// sleep
// eat
// drink water
// breathe
// exist