// grab our db client connection to use with our adapters
const client = require("../client");

async function createOrder(user_id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders("user_id") 
      VALUES($1) 
      RETURNING *;
    `,
      [user_id]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
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

async function getOrderByUserId(user_id) {
  try {
    const { rows } = await client.query(`
        SELECT * 
        FROM orders
        WHERE "user_id"=${user_id} AND "isCheckedOut"=false;
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
  DELETE FROM order_items WHERE "orderId"=${id};
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
  createOrder,
  getAllOrders,
  getOrderByUserId,
  deleteOrder,
  getOrderById,
  updateOrders,
};
