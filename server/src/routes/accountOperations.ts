import db from '../persistence';
import { v4 as uuid } from 'uuid';

const addAccount = async (req :any, res:any) => {
    const account = {
        id: req.body.id,
        name: req.body.username,
        password: req.body.password,
        role: req.body.role,
        state: req.body.state,
        date: new Date().toLocaleString('en-CA'),
    }
    await db.addAccount(account);
    res.send(account);
};

const getAccounts = async (req:any, res:any) => {
    const accounts = await db.getAccounts();
    res.send(accounts);
};

const getAccount = async (req:any, res:any) => {
    const account = await db.getAccount(req.params.id);
    res.send(account);
};

const updateAccount = async (req:any, res:any) => {
    await db.updateAccount(req.params.id, {
        name: req.body.username,
        password: req.body.password,
        role: req.body.role,
        state: req.body.state
    });
    const account = await db.getAccount(req.params.id);
    res.send(account);
};

const deleteAccount = async (req:any, res:any) => {
    await db.deleteAccount(req.params.id);
    res.sendStatus(200);
};

export { addAccount, getAccounts, getAccount, updateAccount, deleteAccount };