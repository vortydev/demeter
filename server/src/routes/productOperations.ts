import db from '../persistence';
import { v4 as uuid } from 'uuid';

const addProduct = async (req :any, res:any) => {
    const item = {
        id: uuid(),
        name: req.body.name,
        completed: false,
    };

    await db.storeItem(item);
    res.send(item);
};

const deleteProduct = async (req:any, res:any) => {
    await db.removeItem(req.params.id);
    res.sendStatus(200);
};

const getProducts = async (req:any, res:any) => {
    const items = await db.getItems();
    res.send(items);
};

const updateProduct = async (req:any, res:any) => {
    await db.updateItem(req.params.id, {
        name: req.body.name,
        completed: req.body.completed,
    });
    const item = await db.getItem(req.params.id);
    res.send(item);
};

export {addProduct, deleteProduct, getProducts, updateProduct};