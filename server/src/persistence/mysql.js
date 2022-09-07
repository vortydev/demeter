const waitPort = require('wait-port');
const fs = require('fs');
const mysql = require('mysql');

const {
    MYSQL_HOST: HOST,
    MYSQL_HOST_FILE: HOST_FILE,
    MYSQL_USER: USER,
    MYSQL_USER_FILE: USER_FILE,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_PASSWORD_FILE: PASSWORD_FILE,
    MYSQL_DB: DB,
    MYSQL_DB_FILE: DB_FILE,
} = process.env;

let pool;

async function init() {
    const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
    const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
    const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
    const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

    await waitPort({ host, port : 3306});

    pool = mysql.createPool({
        connectionLimit: 5,
        host,
        user,
        password,
        database,
        charset: 'utf8mb4',
    });

    // initisialisation de la BD
    return new Promise((acc, rej) => {
        // démo todo app
        pool.query(
            'CREATE TABLE IF NOT EXISTS todo_items (id varchar(36), name varchar(255), completed boolean) DEFAULT CHARSET utf8mb4',
            err => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );

        // create table rôle utilisateur
        pool.query(
            'CREATE TABLE IF NOT EXISTS tbl_role (id int(8) NOT NULL AUTO_INCREMENT, role varchar(32) NOT NULL, CONSTRAINT PK_Role PRIMARY KEY (`id`)) DEFAULT CHARSET utf8mb4',
            err => {
                if (err) return rej(err);
                acc();
            },
        );

        // create table statut utilisateur
        pool.query(
            'CREATE TABLE IF NOT EXISTS tbl_statut (id int(8) NOT NULL AUTO_INCREMENT, statut varchar(32) NOT NULL, CONSTRAINT PK_Statut PRIMARY KEY (`id`)) DEFAULT CHARSET utf8mb4',
            err => {
                if (err) return rej(err);
                acc();
            },
        );

        // insert statuts utilisateur
        // pool.query(
        //     'INSERT INTO tbl_statut (id, statut) VALUES (1, `Inactif`), (2, `Actif`), (3, `Désactivté`);',
        //     err => {
        //         if (err) return rej(err);
        //         acc();
        //     },
        // );

        // insert roles utilisateur
        // pool.query(
        //     'INSERT INTO tbl_role (id, role) VALUES (1, `Admin`), (2, `Employé`), (3, `Livreur`);',
        //     err => {
        //         if (err) return rej(err);
        //         acc();
        //     },
        // );

        // create table utilisateur
        pool.query(
            'CREATE TABLE IF NOT EXISTS tbl_utilisateur (id int(8) NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL, email varchar(255) NOT NULL, mdp varchar(255) NOT NULL, idRole int(8) NOT NULL, idStatut int(8) NOT NULL, dateCreation DATETIME NOT NULL, CONSTRAINT PK_Utilisateur PRIMARY KEY (`id`), CONSTRAINT FK_UserRole FOREIGN KEY (`idRole`) REFERENCES `tbl_role` (`id`), CONSTRAINT FK_UserStatut FOREIGN KEY (`idStatut`) REFERENCES `tbl_statut` (`id`)) DEFAULT CHARSET utf8mb4',
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function teardown() {
    return new Promise((acc, rej) => {
        pool.end(err => {
            if (err) rej(err);
            else acc();
        });
    });
}

async function getItems() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM todo_items', (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}

async function getItem(id) {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM todo_items WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                )[0],
            );
        });
    });
}

async function storeItem(item) {
    return new Promise((acc, rej) => {
        pool.query(
            'INSERT INTO todo_items (id, name, completed) VALUES (?, ?, ?)',
            [item.id, item.name, item.completed ? 1 : 0],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function updateItem(id, item) {
    return new Promise((acc, rej) => {
        pool.query(
            'UPDATE todo_items SET name=?, completed=? WHERE id=?',
            [item.name, item.completed ? 1 : 0, id],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function removeItem(id) {
    return new Promise((acc, rej) => {
        pool.query('DELETE FROM todo_items WHERE id = ?', [id], err => {
            if (err) return rej(err);
            acc();
        });
    });
}

module.exports = {
    init,
    teardown,
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
};
