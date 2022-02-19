// Connect to DB
const { Client } = require('pg');

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'univ-boilerplate-test';

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

let client;

// important! the client instance must be initialized with user/password
// when running in the GitHub Actions CI environment
if (process.env.CI) {
  client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  });
  // otherwise, client is instantiated with the Heroku database url
  // or the local devenv connection string
} else {
  client = new Client(DB_URL);
}

module.exports = client;
