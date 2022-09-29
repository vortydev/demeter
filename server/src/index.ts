// framework
import express from 'express';
import process from 'process';

const app = express();

// BD
import db from './persistence';
import { addProduct, deleteProduct, getProducts, getProduct, updateProduct } from './routes/productOperations';
import { addAccount, getAccounts, getAccount, updateAccount, deleteAccount } from './routes/accountOperations';

app.use(express.json({type: ['application/json', 'text/plain']}));
app.use(express.urlencoded());
app.use(express.static(__dirname + '/static'));

// définit les routes
app.get('/items', getProducts);
app.get('/items/:id', getProduct);
app.post('/items', addProduct);
app.put('/items/:id', updateProduct);
app.delete('/items/:id', deleteProduct);

app.get('/accounts', getAccounts);
app.get('/accounts/:id', getAccount);
app.post('/accounts', addAccount);
app.put('/accounts/:id', updateAccount);
app.delete('/accounts/:id', deleteAccount);

// initialise la BD
db.init().then(() => {
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

// destructor
const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
