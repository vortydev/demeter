import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";

import express from 'express';
import process from 'process';

import db from './persistence/';

// importation des opérations SQL de la base de données
import { getAccounts, getAccount, addAccount, updateAccount, deleteAccount } from './routes/accountOperations';
import { getRoles, getRole } from './routes/roleOperations';
import { getStates, getState } from './routes/stateOperations';
import { getChefPwds, getChefPwd, addChefPwd, updateChefPwd, deleteChefPwd } from './routes/teamleadpwdOperations';
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from './routes/productOperations';
import { getVendors, getVendor, addVendor, updateVendor, deleteVendor } from './routes/vendorOperations';
import { getMesurements, getMesurement } from './routes/mesurementOperations';
import { getProductCategories, getProductCategory } from './routes/categoryProductOperations';

const app = express();

app.use(express.json({type: ['application/json', 'text/plain']}));
app.use(express.urlencoded());
app.use(express.static(__dirname + '/static'));

// // routes utilisateurs
app.get('/accounts', getAccounts);
app.get('/accounts/:id', getAccount);
app.post('/accounts', addAccount);
app.put('/accounts/:id', updateAccount);
app.delete('/accounts/:id', deleteAccount);

// // routes rôles utilisateurs
app.get('/roles', getRoles);
app.get('/roles/:id', getRole);

// // routes états utilisateurs
app.get('/states', getStates);
app.get('/states/:id', getState);

// // routes teamlead passwords
app.get('/teamleadpwd', getChefPwds);
app.get('/teamleadpwd/:id', getChefPwd);
app.post('/teamleadpwd', addChefPwd);
app.put('/teamleadpwd/:id', updateChefPwd);
app.delete('/teamleadpwd/:id', deleteChefPwd);

// // routes produits
app.get('/products', getProducts);
app.get('/products/:id', getProduct);
app.post('/products', addProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);

// // routes fournisseurs
app.get('/vendors', getVendors);
app.get('/vendors/:id', getVendor);
app.post('/vendors', addVendor);
app.put('/vendors/:id', updateVendor);
app.delete('/vendors/:id', deleteVendor);

// // routes mesures
app.get('/mesurements', getMesurements);
app.get('/mesurements/:id', getMesurement);

// // routes catégories produits
app.get('/categories/products', getProductCategories);
app.get('/categories/products/:id', getProductCategory);

// initialise la BD
db.init().then(() => {
  app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err: any) => {
  console.error(err);
  process.exit(1);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
