import { useState } from 'react';
import { Form, Button, Modal, Alert} from 'react-bootstrap';
import { Product } from '../../types/Types';
import { ListingProductsEdit } from './inventory';
import { updateProduct, getProductsByCategory } from '../../services/inventory.functions'

interface CRFormProps {
    show: boolean;
    close: () => void;
    success: () => void;
}

function InventoryUpdate({ show, close, success }: CRFormProps) {

    const [error, setError] = useState<boolean>(false);
    const [products, setProducts] = useState<Array<Product>>([]);

    const [alerting, setAlerting] = useState<boolean>(false);
    const [alerting1, setAlerting1] = useState<boolean>(false);

    async function editProducts(): Promise<void>{

        async function getProducts() {
            setProducts(await getProductsByCategory("2"));
        }

        getProducts();

        setError(false);
        setAlerting(false);
        setAlerting1(false);
        
        products.map(async (productUpdated: Product) => {

            var product = document.getElementById(`qty_inv${productUpdated.id}`) as HTMLInputElement;

            var regexNumber = new RegExp(/[0-9]+/);
    
            if(!product.value){
                setAlerting(true);
                return;
            }
            else if(!regexNumber.test(product.value)){
                setAlerting1(true);
                return;
            }else{
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

                {alerting && <Alert variant="danger">Veuillez remplir tous les champs.</Alert>}
                {alerting1 && <Alert variant="danger">Veuillez entrer un nombre valide.</Alert>}
                
                {/* truc de barre de recherche */}

                <div className="flex invUpdateHeader mt-2">
                    <h4 className="invMAJrowLarge">Produit</h4>
                    <h4 className="invMAJrowLarge">Format</h4>
                    <h4 className="invMAJrowThin">Qt</h4>
                </div>
                <ListingProductsEdit show={show} />
                <div className="mt-3 popupBtnBox">
                    <Button variant="demeter-dark" onClick={close}>Annuler</Button>
                    <Button variant="demeter" onClick={editProducts}>Confirmer</Button>
                </div>
            </Form>
        </Modal >
    );
}

export { InventoryUpdate };