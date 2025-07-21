import Database from 'better-sqlite3';

const db = new Database('db/testDB.db', { verbose: console.log });

export default db
