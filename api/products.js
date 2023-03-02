const express = require('express');
const apiRouter = express.Router();
const { requireUser } = require("./utils");

const {
    Product
} = require('../db/index')

apiRouter.get('/', async (req, res, next) => {
    console.log(req.user)
    const products = await Product.getAllProducts();

    res.send({
        message: req.user
    });
})

apiRouter.post('/createProduct', async (req, res, next) => {
    const { title, description, price, quantity, category, image } = req.body
    try {
        const newProduct = await Product.createProduct({ title, description, price, quantity, category, image })
        res.send(newProduct)

    } catch (error) {
        next(error)
    }
})
apiRouter.get('/:productId', async (req, res, next) => {
    const id = req.params.productId
    try {
        const product = await Product.getProductById(id)
        res.send(product)

    } catch (error) {
        next(error)
    }
})

apiRouter.patch('/:productId', async (req, res, next) => {
    const id = req.params.productId
    const { title, description, price, quantity, category, image } = req.body;
    const updatedFields = { id: id }

    if (title) {
        updatedFields.title = title;
    }
    if (description) {
        updatedFields.description = description;
    }
    if (price) {
        updatedFields.price = price;
    }
    if (quantity) {
        updatedFields.quantity = quantity;
    }
    if (category) {
        updatedFields.category = category;
    }
    if (image) {
        updatedFields.image = image;
    }
    try {
        const updatedProducts = await Product.updateProducts(updatedFields)
        res.send(updatedProducts)
    } catch (error) {
        next(error)
    }
})

apiRouter.delete('/:productId', async (req, res, next) => {
    const id = req.params.productId
    console.log(id)
    try {
        const destroy = await Product.deleteProduct(id)
        res.send(destroy)
    } catch (error) {
        next(error)
    }
})


module.exports = apiRouter;