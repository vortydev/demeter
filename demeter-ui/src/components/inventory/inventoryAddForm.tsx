import { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { Product } from '../../types/Types';
import { GetCategory, GetMesurements, GetVendors } from './inventory';
import { VendorForm } from './inventoryAddVendorForm';
import { createProduct } from '../../services/inventory.functions';

interface CRFormProps {
    show : boolean;
    close: () => void;
    success: () => void;
}

function InventoryForm({ show, close, success }: CRFormProps) {

    const [createNewVendor, setCreateNewVendor] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);
    
    const [alerting, setAlerting] = useState<boolean>(false);
    const [alerting1, setAlerting1] = useState<boolean>(false);
    const [alerting2, setAlerting2] = useState<boolean>(false);
    const [alerting3, setAlerting3] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);

    async function addProduct(): Promise<void>{
        const name = document.getElementById("name") as HTMLInputElement;
        const category = document.getElementById("category") as HTMLInputElement;
        const vendor = document.getElementById("vendor") as HTMLInputElement;
        const qtyUnit = document.getElementById("qty_unit") as HTMLInputElement;
        const mesurement = document.getElementById("mesurement") as HTMLInputElement;
        const format = document.getElementById("format") as HTMLInputElement;
        const price = document.getElementById("price") as HTMLInputElement;
        const qtyInv = document.getElementById("qty_inv") as HTMLInputElement;

        var regexPrice = new RegExp (/[0-9]+[.][0-9]{2}/);
        var regexPrice1 = new RegExp (/[0-9]+[,][0-9]{2}/);
        var regexPrice2 = new RegExp (/[0-9]+[^.,]/);
        var regexNumber = new RegExp(/[0-9]+/);

        setError(false);
        setAlerting(false);
        setAlerting1(false);
        setAlerting2(false);
        setAlerting3(false);

        if (!name.value || !qtyUnit.value || !format.value || !price.value || !qtyInv.value){
            setAlerting(true);
        }
        else if(!regexPrice.test(price.value)&&!regexPrice1.test(price.value)&&!regexPrice2.test(price.value)){
            setAlerting1(true);
        }
        else if(!regexNumber.test(qtyUnit.value)){
            setAlerting2(true);
        }
        else if(!regexNumber.test(qtyInv.value)){
            setAlerting3(true);
        }
        else{
            if (regexPrice1.test(price.value)){
                price.value = price.value.replace(/[,]/, ".");
            }
            else if (regexPrice2.test(price.value)){
                price.value = price.value.concat(".00");
            }

            const newProduct: Product = {
                id: 1,
                name: name.value, 
                categoryproductId: category.value, 
                vendorId: vendor.value, 
                qtyUnit: qtyUnit.value,
                mesurementId: mesurement.value,
                format: format.value,
                price: price.value,
                qtyInv: qtyInv.value
            };
    
            console.log(newProduct);
    
            if (await createProduct(newProduct)){
                success();
            }
            else {
                setError(true);
            }
        }
    }

    function successVendor(): void {
        setSuccess(true);
        closeVendor();
      }
    
      function closeVendor(): void {
        setCreateNewVendor(false);
      }

    return (
        <Modal show={show} onHide={close}>
            {alerting && <Alert>Veuillez remplir tout les champs (Pwease gimme copper owange cowor)</Alert>}
        <Form>
            <Form.Group controlId="name">
                <Form.Label>NOM</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Label>TYPE</Form.Label>
            <Form.Select aria-label="categorie" id="category">
                <GetCategory show={show}/>
            </Form.Select>

            <Form.Group controlId="vendor">
                <Form.Label>FOURNISSEUR</Form.Label>
                <Form.Select aria-label="vendor" id="vendor">
                    <GetVendors show={show}/>
                </Form.Select>
                <Button variant="dark" onClick={() => {
                    setCreateNewVendor(true);
                    setSuccess(false);
                }}> Nouveau Fournisseur </Button>
            </Form.Group>

            {alerting2 && <Alert>Veuillez entrer un nombre (Pwease gimme copper owange cowor)</Alert>}
            <Form.Group controlId="qty_unit">
                <Form.Label>FORMAT (Qt)</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            <Form.Group controlId="mesurement">
                <Form.Label>MESURE</Form.Label>
                <Form.Select aria-label="mesurement" id="mesurement">
                    <GetMesurements show={show}/>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="format">
                <Form.Label>FORMAT (Nom)</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            {alerting1 && <Alert>Veuillez entrer le prix au format #.## ou #,## (Pwease gimme copper owange cowor)</Alert>}
            <Form.Group controlId="price">
                <Form.Label>PRIX (Mettre un point pour la décimale)</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            {alerting3 && <Alert>Veuillez entrer un nombre (Pwease gimme copper owange cowor)</Alert>}
            <Form.Group controlId="qty_inv">
                <Form.Label>Qt EN STOCK</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            <Button variant="dark" onClick={addProduct}>ENVOYER</Button>
        </Form>
        <VendorForm show={createNewVendor} close={closeVendor} success={successVendor}/>
        </Modal>
    );
}

export { InventoryForm };