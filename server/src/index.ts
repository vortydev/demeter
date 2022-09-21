// framework
import express from 'express';
import process from 'process';

const app = express();

// BD
import db from './persistence';
import {getItems} from './routes/getItems';
import {addItem}from './routes/addItem';
import {updateItem} from './routes/updateItem';
import {deleteItem} from './routes/deleteItem';

// SETUP L'APPLICATION
//import path from 'path';
//import {fileURLToPath} from 'url';
//const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(__dirname + '/static'));

// définit les routes
app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

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
