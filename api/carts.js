const express = require('express');
const apiRouter = express.Router();
const { requireUser } = require("./utils");


const {
    Cart
} = require('../db/index');


apiRouter.get('/', async (req, res, next) => {
    const orderItems = await Cart.getAllOrderItems();

    res.send(orderItems);
})

apiRouter.post('/', async (req, res, next) => {
    const { orderId, productId, quantity } = req.body;

    try {
        const newOrderItem = await Cart.addProductOrder({ orderId, productId, quantity })
        res.send(newOrderItem)

    } catch (error) {
        next()
    }
})

// apiRouter.get('/:orderId', async (req, res, next) => {
//     try {
//       const { orderId } = req.params;

//       // Get order items by order id
//       const orderItems = await getOrderItemsByOrderId(orderId);

//       res.json(orderItems);
//     } catch (error) {
//       next(error);
//     }
//   });

module.exports = apiRouter;
