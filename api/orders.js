const express = require('express');
const apiRouter = express.Router();
const { requireUser } = require("./utils");


const {
    Order,
    Cart
} = require('../db/index');

apiRouter.get('/', async (req, res, next) => {
    const orders = await Order.getAllOrders();

    res.send(orders);
})

apiRouter.post('/createOrder', async (req, res, next) => {
    // const productId = req.params.productId;
    const { isCheckedOut, userId } = req.body;

    console.log(req)
    try {
        const newOrder = await Order.createOrder({
            userId, isCheckedOut
        })
        res.send(newOrder)

    } catch (error) {
        next(error)
    }
})

apiRouter.post('/:productId/order', async (req, res, next) => {
    const productId = req.params.productId
    const { orderId, quantity } = req.body

    try {
        const addProductToOrder = await Cart.addProductOrder({ orderId, productId, quantity })
        res.send(addProductToOrder)

    } catch (error) {
        next(error)
    }
})


module.exports = apiRouter;
