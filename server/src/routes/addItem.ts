import db from '../persistence';
import uuid from 'uuid/v4';

export const addItem = async (req, res) => {
    const item = {
        id: uuid(),
        name: req.body.name,
        completed: false,
    };

    await db.storeItem(item);
    res.send(item);
};
