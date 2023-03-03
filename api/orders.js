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

apiRouter.get('/myOrders', async (req, res, next) => {
    const { userId } = req.body
    const usersOrders = await Order.getOrderByUserId(userId);
    res.send(usersOrders);
})

apiRouter.post('/', async (req, res, next) => {
    const { userId } = req.body;

    console.log(req)
    try {
        const newOrder = await Order.createOrder({
            userId
        })
        res.send(newOrder)

    } catch (error) {
        next(error)
    }
})

apiRouter.patch('/:orderId', async (req, res, next) => {
    try {
        const id = req.params.orderId
        const { isCheckedOut } = req.body;
        const updatedFields = { id: id }

        if (isCheckedOut) {
            updatedFields.isCheckedOut = isCheckedOut;
        }
        const updatedOrderItem = await Order.updateOrders(updatedFields);

        res.send(updatedOrderItem);
    } catch (error) {
        next(error);
    }
});

apiRouter.delete('/:orderId', async (req, res, next) => {
    const id = req.params.orderId
    try {
        const destroy = await Order.deleteOrder(id)
        res.send(destroy)
    } catch (error) {
        next(error)
    }
})






module.exports = apiRouter;
