const express = require('express');
const apiRouter = express.Router();
const { requireUser } = require("./utils");


const {
    Cart
} = require('../db/index');


apiRouter.post('/:productId/createCarts', requireUser, async (req, res, next) => {
    const productId = req.params.productId;
    const { id } = req.user

    try {
        const newProduct = await Cart.createCarts({})
        res.send(newProduct)

    } catch (error) {
        next(error)
    }
})

module.exports = apiRouter;
