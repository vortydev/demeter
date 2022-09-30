// framework
import express from 'express';
import process from 'process';

const app = express();

// BD
import db from './persistence';
import { getAccounts, getAccount, addAccount, updateAccount, deleteAccount } from './routes/accountOperations';
import { getRoles, getRole } from './routes/roleOperations';
import { getStates, getState } from './routes/stateOperations';
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from './routes/productOperations';
import { getVendors, getVendor, addVendor, updateVendor, deleteVendor } from './routes/vendorOperations';
import { getMesurements, getMesurement } from './routes/mesurementOperations';

app.use(express.json({type: ['application/json', 'text/plain']}));
app.use(express.urlencoded());
app.use(express.static(__dirname + '/static'));

// routes utilisateurs
app.get('/accounts', getAccounts);
app.get('/accounts/:id', getAccount);
app.post('/accounts', addAccount);
app.put('/accounts/:id', updateAccount);
app.delete('/accounts/:id', deleteAccount);

// routes rôles utilisateurs
app.get('/roles', getRoles);
app.get('/roles/:id', getRole);

// routes états utilisateurs
app.get('/states', getStates);
app.get('/states/:id', getState);

// routes produits
app.get('/products', getProducts);
app.get('/products/:id', getProduct);
app.post('/products', addProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);

// routes fournisseurs
app.get('/vendors', getVendors);
app.get('/vendors/:id', getVendor);
app.post('/vendors', addVendor);
app.put('/vendors/:id', updateVendor);
app.delete('/vendors/:id', deleteVendor);

// routes mesures
app.get('/mesurements', getMesurements);
app.get('/mesurements/:id', getMesurement);

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
