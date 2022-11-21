import { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { Vendor } from '../../../types/Types';
import { createVendor } from '../../../services/vendor.functions';

interface CRFormProps {
    show: boolean;
    close: () => void;
    success: () => void;
}

function VendorForm({ show, close, success }: CRFormProps) {

    const [error, setError] = useState<boolean>(false);

    const [alerting, setAlerting] = useState<boolean>(false);
    const [alerting1, setAlerting1] = useState<boolean>(false);
    const [alerting2, setAlerting2] = useState<boolean>(false);

    setTimeout(() => {
        setAlerting(false);
        setAlerting1(false);
        setAlerting2(false);
    }, 5000);

    async function addVendor(): Promise<void>{
        const vendorName = document.getElementById("vendorName") as HTMLInputElement;
        const phone = document.getElementById("phone") as HTMLInputElement;
        const email = document.getElementById("email") as HTMLInputElement;
        const address = document.getElementById("address") as HTMLInputElement;

        var regexPhone1 = new RegExp(/[0-9]{3} [0-9]{3} [0-9]{4}/);
        var regexPhone2 = new RegExp(/[0-9]{3}-[0-9]{3}-[0-9]{4}/);
        var regexPhone3 = new RegExp(/\([0-9]{3}\)[0-9]{3}-[0-9]{4}/);
        var regexPhone4 = new RegExp(/[0-9]{10}/);
        var regexEmail = new RegExp(/[0-9a-z]+@[a-z]+(.[a-z]+){1,2}/);

        setError(false);
        setAlerting(false);
        setAlerting1(false);
        setAlerting2(false);

        if (!vendorName.value){
            setAlerting(true);
            return;
        }
        
        if(phone.value){
            if(!regexPhone1.test(phone.value)&&!regexPhone2.test(phone.value)&&!regexPhone3.test(phone.value)&&!regexPhone4.test(phone.value)){
                setAlerting1(true);
                return;
            }
        }
        
        if(email.value){
            if(!regexEmail.test(email.value)){
                setAlerting2(true);
                return;
            }
        }
        if (error === false) {
            const newVendor: Vendor = {
                id: 1,
                vendor: vendorName.value,
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
    }

    return (
        <Modal show={show} onHide={close}>
            <Form className="popupForm">
                <h3 className="popupTitle">Ajouter un Fournisseur</h3>

                {alerting && <Alert variant="danger">Veuillez entrer un nom.</Alert>}
                {alerting1 && <Alert variant="danger">Veuillez entrer le numéro de téléphone aux formats suivants: ###-###-####, (###)###-#### ou ### ### ####.</Alert>}
                {alerting2 && <Alert variant="danger">Veuillez entrer une adresse courriel valide.</Alert>}

                <Form.Group className="mb-2" controlId="vendorName">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                
                <Form.Group className="mb-2" controlId="phone">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="email">
                    <Form.Label>Courriel</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="address">
                    <Form.Label>Adresse postale</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <div className="mt-3 popupBtnBox">
                    <Button variant="demeter-dark" onClick={close}>Annuler</Button>
                    <Button variant="demeter" onClick={addVendor}>Ajouter</Button>
                </div>
            </Form>
        </Modal>
    );
}

export { VendorForm };
