import db from '../persistence';

const getStates = async (req:any, res:any) => {
    const roles = await db.getStates();
    res.send(roles);
};

const getState = async (req:any, res:any) => {
    const role = await db.getState(req.params.id);
    res.send(role);
};

export { getStates, getState };