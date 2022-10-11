import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { addProduct } from './inventory';

function InventoryForm(): JSX.Element {

    return (
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
                <Button>NewType</Button>
            </Form.Group>

            <Form.Group controlId="vendor">
                <Form.Label>FOURNISSEUR</Form.Label>
                <DropdownButton title="hmmm">
                    <Dropdown.Item eventKey="1">insert vendor here</Dropdown.Item>
                </DropdownButton>
                <Button> NewVendor </Button>
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
    );
}

export { InventoryForm };