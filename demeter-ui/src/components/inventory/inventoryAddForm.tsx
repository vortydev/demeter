import { Form, Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { addProduct } from './inventory';

interface CRFormProps {
    show : boolean;
      close: () => void;
      success: ()=> void;
    }

function InventoryForm({ show, close, success }: CRFormProps) {

    return (
        <Modal show={show} onHide={close}>
        <Form onSubmit={addProduct}>
            <Form.Group controlId="name">
                <Form.Label>NOM</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="category">
                <Form.Label>TYPE</Form.Label>
                <DropdownButton title="hmmm">
                    <Dropdown.Item eventKey="1">insert category here</Dropdown.Item>
                </DropdownButton>
                <Button>Nouveau Type</Button>
            </Form.Group>

            <Form.Group controlId="vendor">
                <Form.Label>FOURNISSEUR</Form.Label>
                <DropdownButton title="hmmm">
                    <Dropdown.Item eventKey="1">insert vendor here</Dropdown.Item>
                </DropdownButton>
                <Button> Nouveau Fournisseur </Button>
            </Form.Group>

            <Form.Group controlId="qty_unit">
                <Form.Label>FORMAT (Qt)</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            <Form.Group controlId="mesurement">
                <Form.Label>MESURE</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            <Form.Group controlId="format">
                <Form.Label>FORMAT (Nom)</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            <Form.Group controlId="price">
                <Form.Label>PRIX</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            <Form.Group controlId="qty_inv">
                <Form.Label>Qt EN STOCK</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            <Button variant="dark" type="submit">ENVOYER</Button>
        </Form>
        </Modal>
    );
}

export { InventoryForm };