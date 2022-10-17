import { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Product } from '../../types/Types';
import { GetCategory, GetMesurements, GetVendors } from './inventory';
import { VendorForm } from './inventoryAddVendorForm';
import { updateProduct } from '../../services/inventory.functions';

interface CRFormProps {
    show : boolean;
    product : Product;
    close: () => void;
    success: () => void;
}

function InventoryEditProductForm({ show, close, success, product }: CRFormProps) {

    const [createNewVendor, setCreateNewVendor] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);

    async function editProduct(): Promise<void>{
        const name = document.getElementById("name") as HTMLInputElement;
        const category = document.getElementById("category") as HTMLInputElement;
        const vendor = document.getElementById("vendor") as HTMLInputElement;
        const qtyUnit = document.getElementById("qty_unit") as HTMLInputElement;
        const mesurement = document.getElementById("mesurement") as HTMLInputElement;
        const format = document.getElementById("format") as HTMLInputElement;
        const price = document.getElementById("price") as HTMLInputElement;
        const qtyInv = document.getElementById("qty_inv") as HTMLInputElement;

        setError(false);

        const editedProduct: Product = {
            id: product.id,
            name: name.value, 
            categoryproductId: category.value, 
            vendorId: vendor.value, 
            qtyUnit: qtyUnit.value,
            mesurementId: mesurement.value,
            format: format.value,
            price: price.value,
            qtyInv: qtyInv.value
        };

        console.log(editedProduct);

        if (await updateProduct(editedProduct, product.id)){
            success();
        }
        else {
            setError(true);
        }
    }

    function successVendor(): void {
        setSuccess(true);
        close();
      }
    
      function closeVendor(): void {
        setCreateNewVendor(false);
      }

    return (
        <Modal show={show} onHide={close}>
        <Form>
            <Form.Group controlId="name">
                <Form.Label>NOM</Form.Label>
                <Form.Control type="text" defaultValue={product.name}/>
            </Form.Group>

            <Form.Label>TYPE</Form.Label>
            <Form.Select aria-label="categorie" id="category" defaultValue={product.categoryproductId}>
                <GetCategory/>
            </Form.Select>

            <Form.Group controlId="vendor">
                <Form.Label>FOURNISSEUR</Form.Label>
                <Form.Select aria-label="vendor" id="vendor" defaultValue={product.vendorId}>
                    <GetVendors/>
                </Form.Select>
                <Button variant="dark" onClick={() => {
                    setCreateNewVendor(true);
                    setSuccess(false);
                }}> Nouveau Fournisseur </Button>
            </Form.Group>

            <Form.Group controlId="qty_unit" defaultValue={product.qtyUnit}>
                <Form.Label>FORMAT (Qt)</Form.Label>
                <Form.Control type="text" defaultValue={product.qtyUnit}/>
            </Form.Group>

            <Form.Group controlId="mesurement">
                <Form.Label>MESURE</Form.Label>
                <Form.Select aria-label="mesurement" id="mesurement" defaultValue={product.mesurementId}>
                    <GetMesurements/>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="format">
                <Form.Label>FORMAT (Nom)</Form.Label>
                <Form.Control type="text" defaultValue={product.format}/>
            </Form.Group>

            <Form.Group controlId="price">
                <Form.Label>PRIX (Mettre un point pour la décimale)</Form.Label>
                <Form.Control type="text" defaultValue={product.price}/>
            </Form.Group>

            <Form.Group controlId="qty_inv">
                <Form.Label>Qt EN STOCK</Form.Label>
                <Form.Control type="text" defaultValue={product.qtyInv}/>
            </Form.Group>

            <Button variant="dark" onClick={editProduct}>ENVOYER</Button>
        </Form>
        <VendorForm show={createNewVendor} close={closeVendor} success={successVendor}/>
        </Modal>
    );
}

export { InventoryEditProductForm };



