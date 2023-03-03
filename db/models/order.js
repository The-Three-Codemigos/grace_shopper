// grab our db client connection to use with our adapters
const client = require("../client");

async function createOrder({ userId }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders("userId") 
      VALUES($1) 
      RETURNING *;
    `,
      [userId]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  /* this adapter should fetch a list of all orders from your db */
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM orders;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(id) {
  /* this adapter should fetch a specific order from your db */
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM orders
      WHERE id=${id};
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getOrderByUserId(userId) {
  /* this adapter should fetch an order from a specific user from your db */
  try {
    const { rows } = await client.query(`
        SELECT * 
        FROM orders
        WHERE "userId"=${userId};
      `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateOrders({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  const {
    rows: [order],
  } = await client.query(
    `
  UPDATE orders
  SET ${setString}
  WHERE id=${id}
  RETURNING *;
  `,
    Object.values(fields)
  );
  return order;
}

async function deleteOrder(id) {
  await client.query(`
  DELETE FROM orders WHERE id=${id};
  `);
  const {
    rows: [order],
  } = await client.query(`
  DELETE FROM orders WHERE id=${id}
  RETURNING *;
  `);
  return order;
}

module.exports = {
  // add your database adapter functions here
  createOrder,
  getAllOrders,
  getOrderByUserId,
  deleteOrder,
  getOrderById,
  updateOrders,
};
