import { Form, Button, Container, Row, Col, Modal} from 'react-bootstrap';
import { ListingProducts, editProducts } from './inventory';

interface CRFormProps {
    show : boolean;
      close: () => void;
      success: ()=> void;
    }

function InventoryUpdate({ show, close, success }: CRFormProps){
    const edit = true;

    return (
        <Modal show={show} onHide={close}>
        <div>
            <div>
                <h1>Ajustement Des Quantités</h1>
            </div>

            <div>
                <p> truc de barre de recherche </p>
            </div>

            <div>
                <Form id="formMAJ" onSubmit={editProducts}>
                <Container>
                    <Row>
                        <Col><h2>Produit</h2></Col>
                        <Col><h2>Format</h2></Col>
                        <Col><h2>Quantité</h2></Col>
                    </Row>
                        <ListingProducts edit={edit}/>
                    <Row>
                        <Button variant="dark" type="submit">Envoyer</Button>
                    </Row>
                </Container>
                </Form>
            </div>

        </div>
        </Modal>
    );
}

export { InventoryUpdate };