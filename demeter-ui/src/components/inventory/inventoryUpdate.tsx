import { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Alert} from 'react-bootstrap';
import { Product } from '../../types/Types';
import { ListingProductsEdit } from './inventory';
import { updateProduct, getAll } from '../../services/inventory.functions'

interface CRFormProps {
    show : boolean;
      close: () => void;
      success: ()=> void;
    }

function InventoryUpdate({ show, close, success }: CRFormProps) {

    const [error, setError] = useState<boolean>(false);
    const [products, setProducts] = useState<Array<Product>>([]);

    const [alerting, setAlerting] = useState<boolean>(false);
    const [alerting1, setAlerting1] = useState<boolean>(false);

    async function editProducts(): Promise<void>{

        async function getProducts() {
            setProducts(await getAll());
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
        
                    if (await updateProduct(updatedProduct, productUpdated.id)){
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
        <div>
            <div>
                <h1>Ajustement Des Quantités</h1>
            </div>

            <div>
                <p> truc de barre de recherche </p>
            </div>

            <div>
                <Form id="formMAJ">
                <Container>
                    <Row>
                        <Col><h2>Produit</h2></Col>
                        <Col><h2>Format</h2></Col>
                        <Col><h2>Quantité</h2></Col>
                    </Row>
                    {alerting && <Alert>Veuillez remplir tout les champs (Pwease gimme copper owange cowor)</Alert>}
                    {alerting1 && <Alert>Veuillez entrer un nombre valide (Pwease gimme copper owange cowor)</Alert>}
                        <ListingProductsEdit show={show}/>
                    <Row>
                        <Button variant="dark" onClick={editProducts}>Envoyer</Button>
                    </Row>
                </Container>
                </Form>
            </div>

        </div>
        </Modal>
    );
}

export { InventoryUpdate };