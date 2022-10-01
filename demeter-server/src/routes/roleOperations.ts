import db from '../persistence';

const getRoles = async (req:any, res:any) => {
    const roles = await db.getRoles();
    res.send(roles);
};

const getRole = async (req:any, res:any) => {
    const role = await db.getRole(req.params.id);
    res.send(role);
};

export { getRoles, getRole };