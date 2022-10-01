import db from '../persistence';

const getMesurements = async (req:any, res:any) => {
    const mes = await db.getMesurements();
    res.send(mes);
};

const getMesurement = async (req:any, res:any) => {
    const mes = await db.getMesurement(req.params.id);
    res.send(mes);
};

export { getMesurements, getMesurement };