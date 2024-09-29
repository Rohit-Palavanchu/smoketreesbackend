const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../userInfo.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to the database', err);
    } else {
        console.log('Connected to the SQLite database');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS USERS(
        id VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS ADDRESS(
        id VARCHAR(100) UNIQUE NOT NULL,
        userId VARCHAR(100) NOT NULL,
        address VARCHAR(255) NOT NULL,
        UNIQUE (userId, address),
        FOREIGN KEY (userId) REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`);
});

module.exports = db;
