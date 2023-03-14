// grab our db client connection to use with our adapters
const client = require("../client");

async function addProductOrder({ orderId, product_id, quantity }) {

  try {
    const { rows: [orderItem] } = await client.query(`
        INSERT INTO order_items(orderid, product_id, quantity)
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [orderId, product_id, quantity]
    );
    // console.log(orderItem);

    return orderItem;
  } catch (error) {
    console.error(error);
  }
}

async function getAllOrderItems() {
  try {
    const { rows } = await client.query(`
      SELECT * 
       FROM order_items;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getOrderItemsByOrderId(orderId) {
  try {
    const { rows } = await client.query(
      `
        SELECT * 
        FROM order_items
        WHERE "orderId" = $1;
        `,
      [orderId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateOrderItem({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  const {
    rows: [order],
  } = await client.query(
    `
    UPDATE order_items
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `,
    Object.values(fields)
  );
  return order;
}

async function deleteOrderItem(id) {
  const {
    rows: [orderItem],
  } = await client.query(`DELETE FROM order_items WHERE id=$1;`, [id]);
  return orderItem;
}

module.exports = {
  addProductOrder,
  getAllOrderItems,
  getOrderItemsByOrderId,
  updateOrderItem,
  deleteOrderItem,
};
