const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");

const { Product } = require("../db/index");

apiRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/createProduct", async (req, res, next) => {
  const { title, description, price, quantity, category, image } = req.body;
  // requireUser and use User.getUserById(req.user.id) to see if the logged in user is an admin if he is then let them create otherwise throw an error
  try {
    const newProduct = await Product.createProduct({
      title,
      description,
      price,
      quantity,
      category,
      image,
    });
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});
apiRouter.get("/:product_id", async (req, res, next) => {
  const id = req.params.product_id;
  try {
    const product = await Product.getProductById(id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

apiRouter.patch("/:product_id", async (req, res, next) => {
  const id = req.params.product_id;
  const { title, description, price, quantity, category, image } = req.body;
  const updatedFields = { id: id };
  // requireUser and use User.getUserById(req.user.id) to see if the logged in user is an admin if he is then let them update product otherwise throw an error

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
    const updatedProducts = await Product.updateProducts(updatedFields);
    res.send(updatedProducts);
  } catch (error) {
    next(error);
  }
});

apiRouter.delete("/:product_id", async (req, res, next) => {
  const id = req.params.product_id;
  console.log(id);
  // verify the user is an admin to be able to delete a product
  try {
    const destroy = await Product.deleteProduct(id);
    res.send(destroy);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
