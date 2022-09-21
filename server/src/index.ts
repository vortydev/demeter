// framework
import express from 'express';
import process from 'process';

const app = express();

// BD
import db from './persistence';
import {addProduct, deleteProduct, getProducts, updateProduct }from './routes/productOperations';


// SETUP L'APPLICATION
//import path from 'path';
//import {fileURLToPath} from 'url';
//const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(__dirname + '/static'));

// définit les routes
app.get('/items', getProducts);
app.post('/items', addProduct);
app.put('/items/:id', updateProduct);
app.delete('/items/:id', deleteProduct);

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
