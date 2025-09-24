import fs from 'fs';
import Database from 'better-sqlite3';

const dbPath = process.env.DB_PATH || 'database/itsm.db';
fs.rmSync(dbPath, { force: true });

const db = new Database(dbPath);
const schema = fs.readFileSync('database/schema.sql', 'utf-8');
db.exec(schema);
console.log('Database reset. Run npm run seed to reseed.');


