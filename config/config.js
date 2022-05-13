require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD , TOKEN_KEY} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'database_development',
    host: DB_HOST,
    dialect: 'postgres',
    port: 5433,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'database_test',
    host: DB_HOST,
    dialect: 'postgres',
    port: 5433,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'database_development',
    host: DB_HOST,
    dialect: 'postgres',
    port: 5432,
  },
};
