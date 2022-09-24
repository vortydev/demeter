import db from '../persistence';
import { v4 as uuid } from 'uuid';

const addProduct = async (req :any, res:any) => {
    const item = {
        id: uuid(),
        name: req.body.name,
        completed: false,
    };

    await db.addProduct(item);
    res.send(item);
};

const deleteProduct = async (req:any, res:any) => {
    await db.deleteProduct(req.params.id);
    res.sendStatus(200);
};

const getProducts = async (req:any, res:any) => {
    const items = await db.getProducts();
    res.send(items);
};

const updateProduct = async (req:any, res:any) => {
    await db.updateProduct(req.params.id, {
        name: req.body.name,
        completed: req.body.completed,
    });
    const item = await db.getProduct(req.params.id);
    res.send(item);
};

export { addProduct, deleteProduct, getProducts, updateProduct };