import db from '../persistence';

const getItems = async (req:any, res:any) => {
    const items = await db.getItems();
    res.send(items);
};

export {getItems};