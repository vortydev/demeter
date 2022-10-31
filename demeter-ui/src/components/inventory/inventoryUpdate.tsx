import { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { Product } from '../../types/Types';
import { ListingProductsEdit } from './inventory';
import { updateProduct, getAll } from '../../services/inventory.functions'

interface CRFormProps {
    show: boolean;
    close: () => void;
    success: () => void;
}

function InventoryUpdate({ show, close, success }: CRFormProps) {

    const [error, setError] = useState<boolean>(false);
    const [products, setProducts] = useState<Array<Product>>([]);

    async function editProducts(): Promise<void> {

        async function getProducts() {
            setProducts(await getAll());
        }

        getProducts();

        products.map(async (productUpdated: Product) => {

            setError(false);

            var product = document.getElementById(`qty_inv${productUpdated.id}`) as HTMLInputElement;

            var regexNumber = new RegExp(/[0-9]+/);

            if (!product.value) {
                alert("Veuillez entrer une quantité");
            }
            else if (!regexNumber.test(product.value)) {
                alert("Veuillez entrer un nombre valide");
            } else {
                if (productUpdated !== null) {
                    const updatedProduct: Product = {
                        id: productUpdated.id,
                        name: productUpdated.name,
                        categoryproductId: productUpdated.categoryproductId,
                        vendorId: productUpdated.vendorId,
                        price: productUpdated.price,
                        qtyInv: product.value,
                        qtyUnit: productUpdated.qtyUnit,
                        mesurementId: productUpdated.mesurementId,
                        format: productUpdated.format
                    };

                    if (await updateProduct(updatedProduct, productUpdated.id)) {
                        success();
                    }
                    else {
                        setError(true);
                    }

                }
            }
        });
    }

    return (
        <Modal show={show} onHide={close}>
            <Form className="popupForm" id="formMAJ">
                <h3 className="popupTitle">Mise à jour de l'inventaire</h3>
                {/* truc de barre de recherche */}
                <div className="flex invUpdateHeader mt-2">
                    <h4 className="invMAJrowLarge">Produit</h4>
                    <h4 className="invMAJrowLarge">Format</h4>
                    <h4 className="invMAJrowThin">Qt</h4>
                </div>
                <ListingProductsEdit get={show} />
                <div className="mt-3 popupBtnBox">
                    <Button variant="demeter-dark" onClick={close}>Annuler</Button>
                    <Button variant="demeter" onClick={editProducts}>Confirmer</Button>
                </div>
            </Form>
        </Modal >
    );
}

export { InventoryUpdate };