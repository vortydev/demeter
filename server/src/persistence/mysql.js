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

        /* UTILISATEURS */

        // tbl_role_account
        pool.query(
            'CREATE TABLE IF NOT EXISTS tbl_role_account (role_id int(8) NOT NULL AUTO_INCREMENT, role_name varchar(255) NOT NULL, CONSTRAINT PK_RoleAccount PRIMARY KEY (role_id)) DEFAULT CHARSET utf8mb4',
            err => {
                if (err) return rej(err);
                acc();
            },
        );

        // tbl_state_account
        pool.query(
            'CREATE TABLE IF NOT EXISTS tbl_state_account (state_id int(8) NOT NULL AUTO_INCREMENT, state_name varchar(255) NOT NULL, CONSTRAINT PK_StateAccount PRIMARY KEY (state_id)) DEFAULT CHARSET utf8mb4',
            err => {
                if (err) return rej(err);
                acc();
            },
        );

        // tbl_account
        pool.query(
            'CREATE TABLE IF NOT EXISTS tbl_account (acc_id int(8) NOT NULL AUTO_INCREMENT, acc_name varchar(255) NOT NULL, acc_role_id int(8) NOT NULL, acc_state_id int(8) NOT NULL, acc_date_creation DATETIME, FOREIGN KEY (acc_role_id) REFERENCES tbl_role_account(role_id), FOREIGN KEY (acc_state_id) REFERENCES tbl_state_account(state_id), CONSTRAINT PK_Account PRIMARY KEY (acc_id)) DEFAULT CHARSET utf8mb4',
            err => {
                if (err) return rej(err);
                acc();
            },
        );

        // create table utilisateur
        // pool.query(
        //     'CREATE TABLE IF NOT EXISTS tbl_utilisateur (id int(8) NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL, email varchar(255) NOT NULL, mdp varchar(255) NOT NULL, idRole int(8) NOT NULL, idStatut int(8) NOT NULL, dateCreation DATETIME NOT NULL, CONSTRAINT PK_Utilisateur PRIMARY KEY (`id`), CONSTRAINT FK_UserRole FOREIGN KEY (`idRole`) REFERENCES `tbl_role` (`id`), CONSTRAINT FK_UserStatut FOREIGN KEY (`idStatut`) REFERENCES `tbl_statut` (`id`)) DEFAULT CHARSET utf8mb4',
        //     err => {
        //         if (err) return rej(err);
        //         acc();
        //     },
        // );
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
