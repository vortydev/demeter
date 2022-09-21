import db from '../persistence';

export const deleteItem = async (req:any, res:any) => {
    await db.removeItem(req.params.id);
    res.sendStatus(200);
};
