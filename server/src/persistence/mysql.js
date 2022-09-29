const waitPort = require('wait-port');
const fs = require('fs');
const mysql = require('mysql');

// constantes MySQL
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

// initialise la BD. appelé à chaque démarrage de l'application
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

    // création des tables de la BD
    return new Promise((acc, rej) => {

        /* ***** UTILISATEURS ***** */
        pool.getConnection(function (err, conn) {
            if (err) return callback(err);
          
            // tbl_role_account
            conn.query('CREATE TABLE IF NOT EXISTS tbl_role_account (role_id int(8) NOT NULL AUTO_INCREMENT, role_name varchar(255) NOT NULL, CONSTRAINT PK_RoleAccount PRIMARY KEY (role_id)) DEFAULT CHARSET utf8mb4', 
            err => {
                if (err) return rej(err);

            conn.query('INSERT IGNORE INTO tbl_role_account (role_id, role_name) VALUES (1, "Administrateur"), (2, "Employé"), (3, "Livreur")',
            err => {
                if (err) return rej(err);
          
            // tbl_state_account
            conn.query('CREATE TABLE IF NOT EXISTS tbl_state_account (state_id int(8) NOT NULL AUTO_INCREMENT, state_name varchar(255) NOT NULL, CONSTRAINT PK_StateAccount PRIMARY KEY (state_id)) DEFAULT CHARSET utf8mb4', 
            err => {
                if (err) return rej(err);

            conn.query('INSERT IGNORE INTO tbl_state_account (state_id, state_name) VALUES (1, "Inactif"), (2, "Actif"), (3, "Banni")',
            err => {
                if (err) return rej(err);

            // tbl_account
            conn.query('CREATE TABLE IF NOT EXISTS tbl_account (acc_id int(8) NOT NULL AUTO_INCREMENT, acc_name varchar(255) NOT NULL, acc_pwd varchar(255) NOT NULL,acc_role_id int(8) NOT NULL, acc_state_id int(8) NOT NULL, acc_date_creation DATETIME, FOREIGN KEY (acc_role_id) REFERENCES tbl_role_account(role_id), FOREIGN KEY (acc_state_id) REFERENCES tbl_state_account(state_id), CONSTRAINT PK_Account PRIMARY KEY (acc_id)) DEFAULT CHARSET utf8mb4'),
            err => {
                if (err) return rej(err);
                conn.release();
                callback();
            }
            });
            });
            });
            });
        });

        // tbl_teamleader_pw
        pool.query(
            'CREATE TABLE IF NOT EXISTS tbl_teamleader_pw (tpw_id int(8) NOT NULL AUTO_INCREMENT, tpw_name varchar(255) NOT NULL, tpw_password varchar(255) NOT NULL, CONSTRAINT PK_TeamleaderPw PRIMARY KEY (tpw_id)) DEFAULT CHARSET utf8mb4',
            err => {
                if (err) return rej(err);
                // acc();
            }
        );

        /* *** INVENTAIRE & RECETTES *** */
        pool.getConnection(function (err, conn) {
            if (err) return callback(err);

            // tbl_category_product
            conn.query(
                'CREATE TABLE IF NOT EXISTS tbl_category_product (ctp_id int(8) NOT NULL AUTO_INCREMENT, ctp_name varchar(255) NOT NULL, CONSTRAINT PK_CategoryProduct PRIMARY KEY (ctp_id)) DEFAULT CHARSET utf8mb4',
                err => {
                    if (err) return rej(err);

            // tbl_vendor
            conn.query(
                'CREATE TABLE IF NOT EXISTS tbl_vendor (ven_id int(8) NOT NULL AUTO_INCREMENT, ven_name varchar(255) NOT NULL, ven_phone int, ven_email varchar(255), ven_address varchar(511), CONSTRAINT PK_Vendor PRIMARY KEY (ven_id)) DEFAULT CHARSET utf8mb4',
                err => {
                    if (err) return rej(err);

            // tbl_mesurement
            conn.query(
                'CREATE TABLE IF NOT EXISTS tbl_mesurement (mes_id int(8) NOT NULL AUTO_INCREMENT, mes_name varchar(255) NOT NULL, CONSTRAINT PK_Mesurement PRIMARY KEY (mes_id)) DEFAULT CHARSET utf8mb4',
                err => {
                    if (err) return rej(err);

            // tbl_product
            conn.query(
                'CREATE TABLE IF NOT EXISTS tbl_product (pt_id int(8) NOT NULL AUTO_INCREMENT, pt_name varchar(255) NOT NULL, pt_category_id int(8) NOT NULL, pt_vendor_id int(8) NOT NULL, pt_price decimal(15,2) NOT NULL, pt_qty_inv int(8) NOT NULL, pt_qty_unit DECIMAL(15,2) NOT NULL, pt_mes_id int(8) NOT NULL, pt_format varchar(255) NOT NULL, FOREIGN KEY (pt_category_id) REFERENCES tbl_category_product(ctp_id), FOREIGN KEY (pt_vendor_id) REFERENCES tbl_vendor(ven_id), FOREIGN KEY (pt_mes_id) REFERENCES tbl_mesurement(mes_id), CONSTRAINT PK_Product PRIMARY KEY (pt_id)) DEFAULT CHARSET utf8mb4',
                err => {
                    if (err) return rej(err);

            // tbl_recipe
            conn.query(
                'CREATE TABLE IF NOT EXISTS tbl_recipe (rec_id int(8) NOT NULL AUTO_INCREMENT, rec_name varchar(255) NOT NULL, rec_available boolean NOT NULL default 0, CONSTRAINT PK_Recipe PRIMARY KEY (rec_id)) DEFAULT CHARSET utf8mb4',
                err => {
                    if (err) return rej(err);
                                
            // rel_product_recipe
            conn.query(
                'CREATE TABLE IF NOT EXISTS rel_product_recipe (rpr_product_id int(8) NOT NULL, rpr_recipe_id int(8) NOT NULL, rpr_qty int(8) NOT NULL, rpr_mes_id int(8) NOT NULL, FOREIGN KEY (rpr_mes_id) REFERENCES tbl_mesurement(mes_id), FOREIGN KEY (rpr_product_id) REFERENCES tbl_product(pt_id), FOREIGN KEY (rpr_recipe_id) REFERENCES tbl_recipe(rec_id), CONSTRAINT PK_Rel_ProductRecipe PRIMARY KEY (rpr_product_id, rpr_recipe_id)) DEFAULT CHARSET utf8mb4',
                err => {
                    if (err) return rej(err);
                                                        
                    conn.release();
                    // callback();
            });
            });
            });
            });
            });
            });
        });

        /* ***** TÂCHES & ANNNONCES ***** */
        pool.getConnection(function (err, conn) {
            if (err) return callback(err);

            // tbl_category_task
            conn.query(
                'CREATE TABLE IF NOT EXISTS tbl_category_task (ctt_id int(8) NOT NULL AUTO_INCREMENT, ctt_name varchar(255) NOT NULL, ctt_occurance int(8) NOT NULL, CONSTRAINT PK_CategoryTask PRIMARY KEY (ctt_id)) DEFAULT CHARSET utf8mb4',
                err => {
                    if (err) return rej(err);

            // tbl_task
            conn.query(
                'CREATE TABLE IF NOT EXISTS tbl_task (tsk_id int(8) NOT NULL AUTO_INCREMENT, tsk_name varchar(255) NOT NULL, tsk_category_id int(8) NOT NULL, tsk_parent_id int(8) DEFAULT NULL, tsk_completed boolean NOT NULL DEFAULT 0, tsk_responsable varchar(255) DEFAULT NULL, tsk_date_up DATETIME, tsk_date_completed DATETIME, FOREIGN KEY (tsk_category_id) REFERENCES tbl_category_task(ctt_id), FOREIGN KEY (tsk_parent_id) REFERENCES tbl_task(tsk_id), CONSTRAINT PK_Task PRIMARY KEY (tsk_id)) DEFAULT CHARSET utf8mb4',
                err => {
                    if (err) return rej(err);

            // tbl_announcement
            conn.query(
                'CREATE TABLE IF NOT EXISTS tbl_announcement (ann_id int(8) NOT NULL AUTO_INCREMENT, ann_title varchar(255) NOT NULL, ann_msg TEXT NOT NULL, ann_img varchar(255) DEFAULT NULL, ann_receiver_id int(8) NOT NULL, ann_active boolean NOT NULL DEFAULT 1, ann_author varchar(255) NOT NULL, ann_task_id int(8) DEFAULT NULL, ann_date_creation DATETIME, FOREIGN KEY (ann_receiver_id) REFERENCES tbl_role_account(role_id), FOREIGN KEY (ann_task_id) REFERENCES tbl_task(tsk_id), CONSTRAINT PK_Announcement PRIMARY KEY (ann_id)) DEFAULT CHARSET utf8mb4',
                err => {
                    if (err) return rej(err);

                    conn.release();
                    // callback();
            }); 
            });  
            });   
        });

        acc();
        console.log('Database ready!');
    });
}

// destructor
async function teardown() {
    return new Promise((acc, rej) => {
        pool.end(err => {
            if (err) rej(err);
            else acc();
        });
    });
}

// getProducts
async function getProducts() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM tbl_product', (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(product =>
                    Object.assign({}, product),
                ),
            );
        });
    });
}

// getProduct
async function getProduct(id) {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM tbl_product WHERE pt_id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(product =>
                    Object.assign({}, product),
                )[0],
            );
        });
    });
}

// addProduct
// TODO
async function addProduct(product) {
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

// updateProduct
// TODO
async function updateProduct(id, item) {
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

// deleteProduct
async function deleteProduct(id) {
    return new Promise((acc, rej) => {
        pool.query('DELETE FROM tbl_product WHERE pt_id = ?', [id], err => {
            if (err) return rej(err);
            acc();
        });
    });
}

/* ***** Utilisateurs ***** */

// getAccounts
async function getAccounts() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM tbl_account', (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(account =>
                    Object.assign({}, account),
                ),
            );
        });
    });
}

// getAccount
async function getAccount(id) {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM tbl_account WHERE acc_id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(account =>
                    Object.assign({}, account),
                )[0],
            );
        });
    });
}

// addAccount
async function addAccount(account) {
    return new Promise((acc, rej) => {
        pool.query(
            'INSERT IGNORE INTO tbl_account (acc_id, acc_name, acc_pwd, acc_role_id, acc_state_id, acc_date_creation) VALUES (?, ?, ?, ?, ?, ?)',
            [account.id, account.name, account.password, account.role, account.state, account.date],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

// updateAccount
async function updateAccount(id, account) {
    return new Promise((acc, rej) => {
        pool.query(
            'UPDATE tbl_account SET acc_name=?, acc_pwd=?, acc_role_id=?, acc_state_id=? WHERE acc_id=?',
            [account.name, account.password, account.role, account.state, id],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

// deleteAccount
async function deleteAccount(id) {
    return new Promise((acc, rej) => {
        pool.query('DELETE FROM tbl_account WHERE acc_id = ?', [id], err => {
            if (err) return rej(err);
            acc();
        });
    });
}

module.exports = {
    init,
    teardown,
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    addAccount,
    getAccounts,
    getAccount,
    updateAccount,
    deleteAccount,
};
