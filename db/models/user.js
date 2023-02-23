// grab our db client connection to use with our adapters
const client = require('../client');

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows } = await client.query(`
      SELECT id, "firstName", "lastName", email, password 
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createUser({
  firstName,
  lastName,
  email,
  password
}) {
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO users("firstName", "lastName", email, password) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (email) DO NOTHING 
      RETURNING *;
    `, [firstName, lastName, email, password]);

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // add your database adapter functions here
  getAllUsers,
  createUser,
};