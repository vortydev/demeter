import db from '../persistence';

// retourne les fournisseurs
const getVendors = async (req:any, res:any) => {
    const vendors = await db.getVendors();
    res.send(vendors);
};

// retourne un fournisseur
const getVendor = async (req:any, res:any) => {
    const vendor = await db.getVendor(req.params.id);
    res.send(vendor);
};

// supprime un fournisseur
const deleteVendor = async (req:any, res:any) => {
    await db.deleteVendor(req.params.id);
    res.sendStatus(200);
};

// ajoute un fournisseur
const addVendor = async (req :any, res:any) => {
    const vendor = {
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    };

    await db.addVendor(vendor);
    res.send(vendor);
};

const updateVendor = async (req:any, res:any) => {
    await db.updateVendor(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    });
    const vendor = await db.getVendor(req.params.id);
    res.send(vendor);
}

export { getVendors, getVendor, deleteVendor, addVendor, updateVendor};