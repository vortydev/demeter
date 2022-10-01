import db from '../persistence';

const getChefPwds = async (req:any, res:any) => {
    const passwords = await db.getChefPwds();
    res.send(passwords);
};

const getChefPwd = async (req:any, res:any) => {
    const pwd = await db.getChefPwd(req.params.id);
    res.send(pwd);
};

const deleteChefPwd = async (req:any, res:any) => {
    await db.deleteChefPwd(req.params.id);
    res.sendStatus(200);
};

const addChefPwd = async (req :any, res:any) => {
    const pwd = {
        id: req.body.id,
        name: req.body.name,
        password: req.body.password,
    }
    await db.addChefPwd(pwd);
    res.send(pwd);
};

// mets à jour un utilisateur
const updateChefPwd = async (req:any, res:any) => {
    await db.updateChefPwd(req.params.id, {
        name: req.body.name,
        password: req.body.password,
    });
    const pwd = await db.getChefPwd(req.params.id);
    res.send(pwd);
};

export { getChefPwds, getChefPwd, deleteChefPwd, addChefPwd, updateChefPwd };