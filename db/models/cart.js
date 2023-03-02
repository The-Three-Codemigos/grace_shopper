// grab our db client connection to use with our adapters
const client = require('../client');

// async function addProductOrder({
//     orderId,
//     productId,
//     quantity
// }) {
//     try {
//         const { rows: [orderProduct] } = await client.query(`
//       INSERT INTO orderProduct("orderId", "productId", quantity) 
//       VALUES($1, $2, $3) 
//       RETURNING *;
//     `, [orderId, productId, quantity]);

//         return orderProduct;
//     } catch (error) {
//         throw error;
//     }
// }

// async function getAllProductOrder() {
//     /* this adapter should fetch a list of all carts from your db */
//     try {
//         const { rows } = await client.query(`
//       SELECT * 
//       FROM carts;
//     `);

//         return rows;
//     } catch (error) {
//         throw error;
//     }
// }

// async function getCartById(id) {
//     /* this adapter should fetch a specific cart from your db */
//     try {
//         const { rows } = await client.query(`
//       SELECT * 
//       FROM carts
//       WHERE id=${id};
//     `);

//         return rows;
//     } catch (error) {
//         throw error;
//     }
// }

// async function getCartsByUserId(userId) {
//     /* this adapter should fetch an cart from a specific user from your db */
//     try {
//         const { rows } = await client.query(`
//         SELECT * 
//         FROM carts
//         WHERE "userId"=${userId};
//       `);

//         return rows;
//     } catch (error) {
//         throw error;
//     }
// }

// async function updateCart({ id, ...fields }) {
//     const setString = Object.keys(fields).map(
//         (key, index) => `"${key}"=$${index + 1}`
//     ).join(', ');

//     const { rows: [cart] } = await client.query(`
//   UPDATE carts
//   SET ${setString}
//   WHERE id=${id}
//   RETURNING *;
//   `, Object.values(fields))
//     return cart
// }

// async function deleteCart(id) {
//     const { rows: [cart] } = await client.query(`
//   DELETE FROM carts WHERE id=${id}
//   RETURNING *;
//   `)
//     return cart
// }

module.exports = {
    // add your database adapter functions here
    // addProductOrder,
    // getAllProductOrder,
    // getCartsByUserId,
    // deleteCart,
    // getCartById,
    // updateCart
};