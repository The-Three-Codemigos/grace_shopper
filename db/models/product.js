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
    const { rows: [product] } = await client.query(`
      INSERT INTO products(title, description, price, quantity, category, image) 
      VALUES($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `, [title, description, price, quantity, category, image]);

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  /* this adapter should fetch a list of products from your db */
  try {
    const { rows } = await client.query(`
      SELECT id, title, description, price, quantity, category, image 
      FROM products;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  /* this adapter should fetch a specific product from your db */
  try {
    const { rows } = await client.query(`
      SELECT id, title, description, price, quantity, category, image 
      FROM products
      WHERE id=${id};
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateProducts({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');

  const { rows: [product] } = await client.query(`
  UPDATE products
  SET ${setString}
  WHERE id=${id}
  RETURNING *;
  `, Object.values(fields))
  return product
}

async function deleteProduct(id) {

  await client.query(`
  DELETE FROM orders WHERE "productId"=${id}
  `)

  const { rows: [product] } = await client.query(`
  DELETE FROM products WHERE id=$1;
  `, [id])
  return product
}

module.exports = {
  // add your database adapter functions here
  createProduct,
  getAllProducts,
  updateProducts,
  deleteProduct,
  getProductById
};