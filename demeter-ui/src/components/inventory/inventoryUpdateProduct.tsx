import { useEffect, useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { Product } from '../../types/Types';
import { GetCategory, GetMesurements, GetVendors } from './inventory';
import { VendorForm } from './inventoryAddVendorForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import { getProduct, updateProduct } from '../../services/inventory.functions';

interface CRFormProps {
    show: boolean;
    product: Product;
    close: () => void;
    success: () => void;
}

function InventoryEditProductForm({ show, close, success, product }: CRFormProps) {

    const [createNewVendor, setCreateNewVendor] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);

    const [alerting, setAlerting] = useState<boolean>(false);
    const [alerting1, setAlerting1] = useState<boolean>(false);
    const [alerting2, setAlerting2] = useState<boolean>(false);
    const [alerting3, setAlerting3] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);

    async function editProduct(): Promise<void> {
        const name = document.getElementById("name") as HTMLInputElement;
        const category = document.getElementById("category") as HTMLInputElement;
        const vendor = document.getElementById("vendor") as HTMLInputElement;
        const qtyUnit = document.getElementById("qty_unit") as HTMLInputElement;
        const mesurement = document.getElementById("mesurement") as HTMLInputElement;
        const format = document.getElementById("format") as HTMLInputElement;
        const price = document.getElementById("price") as HTMLInputElement;
        const qtyInv = document.getElementById("qty_inv") as HTMLInputElement;

        var regexPrice = new RegExp(/[0-9]+[.][0-9]{2}/);
        var regexPrice1 = new RegExp(/[0-9]+[,][0-9]{2}/);
        var regexPrice2 = new RegExp(/[0-9]+[^.,0-9]/);
        var regexNumber = new RegExp(/[0-9]+/);

        setError(false);
        setAlerting(false);
        setAlerting1(false);
        setAlerting2(false);
        setAlerting3(false);

        if (!name.value || !qtyUnit.value || !format.value || !price.value || !qtyInv.value) {
            setAlerting(true);
        }
        else if (!regexPrice.test(price.value) && !regexPrice1.test(price.value) && !regexPrice2.test(price.value)) {
            setAlerting1(true);
        }
        else if (!regexNumber.test(qtyUnit.value)) {
            setAlerting2(true);
        }
        else if (!regexNumber.test(qtyInv.value)) {
            setAlerting3(true);
        }
        else {
            if (regexPrice1.test(price.value)) {
                price.value = price.value.replace(/[,]/, ".");
            }
            else if (regexPrice2.test(price.value)) {
                price.value = price.value.concat(".00");
            }

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

            if (await updateProduct(editedProduct, product.id)) {
                success();
            }
            else {
                setError(true);
            }
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
            <Form className="popupForm">
                <h3 className="popupTitle">Édition d'un Produit</h3>

                {alerting && <Alert variant="danger">Veuillez remplir tous les champs.</Alert>}
                {alerting1 && <Alert variant="danger">Veuillez entrer le prix au format #.## ou #,##.</Alert>}
                {alerting2 && <Alert variant="danger">Veuillez entrer un nombre.</Alert>}
                {alerting3 && <Alert variant="danger">Veuillez entrer un nombre.</Alert>}

                <div className="popupRowSplit mb-2">
                    <Form.Group controlId="name">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" defaultValue={product.name} />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label className="popupSelectLabelFull">Type</Form.Label>
                        <Form.Select aria-label="categorie" id="category" defaultValue={product.categoryproductId}>
                            <GetCategory show={show} />
                        </Form.Select>
                    </Form.Group>
                </div>

                <Form.Group className="vendorBox mb-2" controlId="vendor">
                    <Form.Label className="popupSelectLabel">Fournisseur</Form.Label>
                    <Form.Select aria-label="vendor" id="vendor" defaultValue={product.vendorId}>
                        <GetVendors show={show} />
                    </Form.Select>

                    <div className="vendorListBox">
                        <FontAwesomeIcon className="iconList iconEdit cursor" icon={faList} size="lg" onClick={() => {
                            setSuccess(false);
                            console.log("liste fournisseurs");
                        }} />
                        <FontAwesomeIcon className="iconAdd iconEdit cursor" icon={faPlus} size="lg" onClick={() => {
                            setCreateNewVendor(true);
                            setSuccess(false);
                        }} />
                    </div>
                </Form.Group>

                <div className="popupRowSplit mb-2">
                    <Form.Group controlId="qty_unit">
                        <Form.Label>Format (Qt)</Form.Label>
                        <Form.Control type="text" defaultValue={product.qtyUnit} />
                    </Form.Group>

                    <Form.Group controlId="mesurement">
                        <Form.Label className="popupSelectLabelFull">Mesure</Form.Label>
                        <Form.Select aria-label="mesurement" id="mesurement" defaultValue={product.mesurementId}>
                            <GetMesurements show={show} />
                        </Form.Select>
                    </Form.Group>
                </div>

                <Form.Group className="mb-2" controlId="format">
                    <Form.Label>Format (Nom)</Form.Label>
                    <Form.Control type="text" defaultValue={product.format} />
                </Form.Group>

                <div className="popupRowSplit mb-2">
                    <Form.Group controlId="price">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control type="text" defaultValue={product.price} />
                    </Form.Group>

                    <Form.Group controlId="qty_inv">
                        <Form.Label>Quantité en stock</Form.Label>
                        <Form.Control type="text" defaultValue={product.qtyInv} />
                    </Form.Group>
                </div>

                <div className="mt-3 popupBtnBox">
                    <Button variant="demeter-dark" onClick={close}>Annuler</Button>
                    <Button variant="demeter" onClick={editProduct}>Confirmer</Button>
                </div>
            </Form>
            <VendorForm show={createNewVendor} close={closeVendor} success={successVendor} />
        </Modal>
    );
}

export { InventoryEditProductForm };



