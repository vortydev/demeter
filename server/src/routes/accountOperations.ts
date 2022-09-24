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
    console.log(account);

    await db.addAccount(account);
    res.send(account);
};

const getAccounts = async (req:any, res:any) => {
    const accounts = await db.getAccounts();
    res.send(accounts);
};

export { addAccount, getAccounts };