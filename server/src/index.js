// framework
const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const app = express();

// BD
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

// auth0 login
const authConfig = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3000',
    clientID: 'oE7iUzsQ8QD09VOJLIEbtMRSRFjMUo0R',
    issuerBaseURL: 'https://dev-demeter.us.auth0.com',
    secret: '30LPR2PFZP35EuYAFoUTe_e800DBR-2NljVtsk1guQJ4lEJmadbbZa9vAMaiKD3F' // !!! PUT THIS IN A FILE
  };

// SETUP L'APPLICATION
app.use(express.json());
app.use(express.static(__dirname + '/static'));

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(authConfig));

// définit les routes
app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(
      req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
    )
  });
  
  // The /profile route will show the user profile as JSON
  app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
  });

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
