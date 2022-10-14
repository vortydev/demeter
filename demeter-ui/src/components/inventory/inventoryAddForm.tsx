import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { addProduct, GetCategory, GetVendors } from './inventory';
import { VendorForm } from './inventoryAddVendorForm';

interface CRFormProps {
    show : boolean;
      close: () => void;
      success: () => void;
    }

function InventoryForm({ show, close, success }: CRFormProps) {

    const [createNewVendor, setCreateNewVendor] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);

    function successVendor(): void {
        setSuccess(true);
        close();
      }
    
      function closeVendor(): void {
        //setCreateNewProduct(false);
        //setUpdatedProducts(false);
        setCreateNewVendor(false);
      }

    return (
        <Modal show={show} onHide={close}>
        <Form onSubmit={addProduct}>
            <Form.Group controlId="name">
                <Form.Label>NOM</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Label>TYPE</Form.Label>
            <Form.Select aria-label="categorie" id="category">
                <GetCategory/>
            </Form.Select>

            <Form.Group controlId="vendor">
                <Form.Label>FOURNISSEUR</Form.Label>
                <Form.Select aria-label="vendor" id="vendor">
                    <GetVendors/>
                </Form.Select>
                <Button variant="dark" onClick={() => {
                    setCreateNewVendor(true);
                    setSuccess(false);
                }}> Nouveau Fournisseur </Button>
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
        <VendorForm show={createNewVendor} close={closeVendor} success={successVendor}/>
        </Modal>
    );
}

export { InventoryForm };