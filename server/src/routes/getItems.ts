import db from '../persistence';

export const getItems = async (req:any, res:any) => {
    const items = await db.getItems();
    res.send(items);
};
