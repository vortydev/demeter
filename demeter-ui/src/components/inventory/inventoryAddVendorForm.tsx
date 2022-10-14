import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Vendor } from '../../types/Types';
import { createVendor } from '../../services/vendor.functions';

interface CRFormProps {
    show : boolean;
    close: ()=> void;
    success: ()=> void;
}

function VendorForm({ show, close, success }: CRFormProps) {

    const [error, setError] = useState<boolean>(false);

    async function addVendor(): Promise<void>{
        const vendorName = document.getElementById("vendorName") as HTMLInputElement;
        const phone = document.getElementById("phone") as HTMLInputElement;
        const email = document.getElementById("email") as HTMLInputElement;
        const address = document.getElementById("address") as HTMLInputElement;
    
        setError(false);

        const newVendor: Vendor = {
            id: 1,
            name: vendorName.value,
            phone: phone.value,
            email: email.value,
            address: address.value
        };
    
        if (await createVendor(newVendor)) {
            success();
        }
        else {
            setError(true);
        }
    }

    return(
        <Modal show={show} onHide={close}>
            <Form>
                <Form.Group controlId="vendorName">
                    <Form.Label>NOM</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Label>TÉLÉPHONE</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>COURRIEL</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group controlId="address">
                    <Form.Label>ADRESSE</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Button variant="dark" onClick={addVendor}>ENVOYER</Button>

            </Form>
        </Modal>
    );
}

export { VendorForm };
