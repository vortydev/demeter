import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Product } from '../../types/Types';
import { GetCategory, GetMesurements, GetVendors } from './inventory';
import { VendorForm } from './inventoryAddVendorForm';
import { createProduct } from '../../services/inventory.functions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList } from "@fortawesome/free-solid-svg-icons";

interface CRFormProps {
    show: boolean;
    close: () => void;
    success: () => void;
}

function InventoryForm({ show, close, success }: CRFormProps) {
    const [createNewVendor, setCreateNewVendor] = useState<boolean>(false);
    const [createdSuccess, setSuccess] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);

    async function addProduct(): Promise<void> {
        const name = document.getElementById("name") as HTMLInputElement;
        const category = document.getElementById("category") as HTMLInputElement;
        const vendor = document.getElementById("vendor") as HTMLInputElement;
        const qtyUnit = document.getElementById("qty_unit") as HTMLInputElement;
        const mesurement = document.getElementById("mesurement") as HTMLInputElement;
        const format = document.getElementById("format") as HTMLInputElement;
        const price = document.getElementById("price") as HTMLInputElement;
        const qtyInv = document.getElementById("qty_inv") as HTMLInputElement;

        var regexPrice = new RegExp(/[0-9]+[.][0-9]{2}/);
        var regexNumber = new RegExp(/[0-9]+/);

        setError(false);

        if (!name.value || !qtyUnit.value || !format.value || !price.value || !qtyInv.value) {
            alert("Veuillez remplir tous les champs.");
        }
        else if (!regexPrice.test(price.value)) {
            alert("Veuillez entrer le prix au format #.##.");
        }
        else if (!regexNumber.test(qtyInv.value)) {
            alert("Veuillez entrer un nombre.");
        }
        else if (!regexNumber.test(qtyUnit.value)) {
            alert("Veuillez entrer un nombre.");
        }
        else {
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

            if (await createProduct(newProduct)) {
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
            <Form className="popupForm">
                <h3 className="popupTitle">Nouveau Produit</h3>

                <div className="popupRowSplit mb-2">
                    <Form.Group controlId="name">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label className="popupSelectLabelFull">Type</Form.Label>
                        <Form.Select aria-label="categorie" id="category">
                            <GetCategory get={show} />
                        </Form.Select>
                    </Form.Group>
                </div>

                <Form.Group className="vendorBox mb-2" controlId="vendor">
                    <Form.Label className="popupSelectLabel">Fournisseur</Form.Label>
                    <Form.Select aria-label="vendor" id="vendor">
                        <GetVendors get={show} />
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
                        <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group controlId="mesurement">
                        <Form.Label className="popupSelectLabelFull">Mesure</Form.Label>
                        <Form.Select aria-label="mesurement" id="mesurement">
                            <GetMesurements get={show} />
                        </Form.Select>
                    </Form.Group>
                </div>

                <Form.Group className="mb-2" controlId="format">
                    <Form.Label>Format (Nom)</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <div className="popupRowSplit mb-2">
                    <Form.Group controlId="price">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group controlId="qty_inv">
                        <Form.Label>Quantité en stock</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </div>

                <div className="mt-3 popupBtnBox">
                    <Button variant="demeter-dark" onClick={close}>Annuler</Button>
                    <Button variant="demeter" onClick={addProduct}>Ajouter</Button>
                </div>
            </Form>
            <VendorForm show={createNewVendor} close={closeVendor} success={successVendor} />
        </Modal>
    );
}

export { InventoryForm };