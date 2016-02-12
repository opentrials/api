require('dotenv').config();

const db = {
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
  },
};

module.exports = db;
