import db from '../persistence';

// ajoute un compte utilisateur
const addAccount = async (req :any, res:any) => {
    const account = {
        id: req.body.id,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        state: req.body.state,
        date: new Date().toLocaleString('en-CA'),
    }
    await db.addAccount(account);
    res.send(account);
};

// retourne un array de tous les utilisateurs
const getAccounts = async (req:any, res:any) => {
    const accounts = await db.getAccounts();
    res.send(accounts);
};

// retourne l'utilisateur ayant l'ID en paramètre
const getAccount = async (req:any, res:any) => {
    const account = await db.getAccount(req.params.id);
    res.send(account);
};

// mets à jour un utilisateur
const updateAccount = async (req:any, res:any) => {
    await db.updateAccount(req.params.id, {
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        state: req.body.state
    });
    const account = await db.getAccount(req.params.id);
    res.send(account);
};

// supprime un utilisateur
const deleteAccount = async (req:any, res:any) => {
    await db.deleteAccount(req.params.id);
    res.sendStatus(200);
};

export { addAccount, getAccounts, getAccount, updateAccount, deleteAccount };