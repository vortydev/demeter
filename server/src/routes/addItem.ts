import db from '../persistence';
import { v4 as uuid } from 'uuid';

const addItem = async (req :any, res:any) => {
    const item = {
        id: uuid(),
        name: req.body.name,
        completed: false,
    };

    await db.storeItem(item);
    res.send(item);
};


export {addItem};