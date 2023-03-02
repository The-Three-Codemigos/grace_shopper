// grab our db client connection to use with our adapters
const client = require('../client');

// async function addProductOrder({
//     orderId,
//     productId,
//     quantity
// }) {
//     try {
//         const { rows: [orderProduct] } = await client.query(`
//       INSERT INTO order_Product("orderId", "productId", quantity) 
//       VALUES($1, $2, $3) 
//       RETURNING *;
//     `, [orderId, productId, quantity]);

//         return orderProduct;
//     } catch (error) {
//         throw error;
//     }
// }

async function addProductOrder(req, res, next) {
    try {
        const { orderId, productId, quantity } = req.body;

        // Check if order exists
        // const order = await getOrderById(orderId);
        // if (!order) {
        //     return res.status(404).json({ error: 'Order not found' });
        // }

        // // Check if product exists
        // const product = await getProductById(productId);
        // if (!product) {
        //     return res.status(404).json({ error: 'Product not found' });
        // }

        // Decrement product quantity
        // await updateProduct(productId, { quantity: product.quantity - quantity });

        // Create order item
        const { rows: [orderItem] } = await client.query(`
        INSERT INTO order_items("orderId", "productId", quantity)
        VALUES($1, $2, $3)
        RETURNING *;
      `, [orderId, productId, quantity]);

        return orderItem;

    } catch (error) {
        next(error);
    }
}

async function getAllOrderItems() {
    /* this adapter should fetch a list of all carts from your db */
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
    addProductOrder,
    getAllOrderItems
    // getAllProductOrder,
    // getCartsByUserId,
    // deleteCart,
    // getCartById,
    // updateCart
};