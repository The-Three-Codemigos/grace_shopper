// grab our db client connection to use with our adapters
const client = require('../client');

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
  // add your database adapter functions here
  createProduct
};