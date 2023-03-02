const express = require('express');
const apiRouter = express.Router();
const { requireUser } = require("./utils");


const {
    Order
} = require('../db/index');

apiRouter.get('/', async (req, res, next) => {
    const orders = await Order.getAllOrders();

    res.send(orders);
})

apiRouter.post('/createOrder', async (req, res, next) => {
    // const productId = req.params.productId;
    const { isCheckedOut, id } = req.body;

    console.log(req)
    try {
        const newOrder = await Order.createOrder({
            id, isCheckedOut
        })
        res.send(newOrder)

    } catch (error) {
        next(error)
    }
})

module.exports = apiRouter;
