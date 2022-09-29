import db from '../persistence';
import { v4 as uuid } from 'uuid';

// ajoute un produit
const addProduct = async (req :any, res:any) => {
    const product = {
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        vendor: req.body.vendor,
        price: req.body.price,
        qty_inv: req.body.qty_inv,
        qty_unit: req.body.qty_unit,
        mesurement: req.body.mesurement,
        format: req.body.format,
    };

    await db.addProduct(product);
    res.send(product);
};

// supprime un produit
const deleteProduct = async (req:any, res:any) => {
    await db.deleteProduct(req.params.id);
    res.sendStatus(200);
};

// retourne tous les produits
const getProducts = async (req:any, res:any) => {
    const products = await db.getProducts();
    res.send(products);
};

// retourne un produit
const getProduct = async (req:any, res:any) => {
    const product = await db.getProduct(req.params.id);
    res.send(product);
};

// mets à jour un produit
const updateProduct = async (req:any, res:any) => {
    await db.updateProduct(req.params.id, {
        name: req.body.name,
        completed: req.body.completed,
    });
    const product = await db.getProduct(req.params.id);
    res.send(product);
};

export { addProduct, deleteProduct, getProducts, getProduct, updateProduct };