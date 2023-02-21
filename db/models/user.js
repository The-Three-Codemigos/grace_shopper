// grab our db client connection to use with our adapters
const client = require('../client');

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}

async function createUser({ 
  firstName, 
  lastName,
  email,
  password
}) {
  try {
    const { rows: [ user ] } = await client.query(`
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

async function createProduct({ 
  title, 
  description,
  price,
  quantity,
  category,
  image
}) {
  try {
    const { rows: [ product ] } = await client.query(`
      INSERT INTO products(title, description, price, quantity, category, image) 
      VALUES($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `, [title, description, price, quantity, category, image]);

    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  createProduct
};