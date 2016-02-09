const db = {
  development: {
    client: 'sqlite3',
    connection: 'api.db',
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
  },
};

module.exports = db;
