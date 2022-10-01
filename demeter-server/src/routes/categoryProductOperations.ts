import db from '../persistence';

const getProductCategories = async (req:any, res:any) => {
    const cat = await db.getProductCategories();
    res.send(cat);
};

const getProductCategory = async (req:any, res:any) => {
    const cat = await db.getProductCategory(req.params.id);
    res.send(cat);
};

export { getProductCategories, getProductCategory };