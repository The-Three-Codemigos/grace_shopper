// Connect to DB
const { Client } = require('pg');

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'change-this-name';

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

const client = new Client(DB_URL);

const models = require('./models');

module.exports = {
  client,
  ...models,
};
