const express = require("express");
const apiRouter = express.Router();

const { OrderItems } = require("../db/index");

apiRouter.get("/", async (req, res, next) => {
  try {
    const orderItems = await OrderItems.getAllOrderItems();
    res.send(orderItems);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/:product_id", async (req, res, next) => {
  const { orderId, quantity } = req.body;
  const product_id = req.params.product_id;

  try {
    const newOrderItem = await OrderItems.addProductOrder({
      orderId,
      product_id,
      quantity,
    });
    res.send(newOrderItem);
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderItems = await OrderItems.getOrderItemsByOrderId(orderId);
    res.send(orderItems);
  } catch (error) {
    next(error);
  }
});

apiRouter.patch("/:orderItemId", async (req, res, next) => {
  try {
    const id = req.params.orderItemId;
    const { quantity } = req.body;
    const updatedFields = { id: id };

    if (quantity) {
      updatedFields.quantity = quantity;
    }
    const updatedOrderItem = await OrderItems.updatedOrderItem(updatedFields);

    res.send(updatedOrderItem);
  } catch (error) {
    next(error);
  }
});

apiRouter.delete("/:orderItemId", async (req, res, next) => {
  const id = req.params.orderItemId;
  try {
    const destroy = await OrderItems.deleteOrderItem(id);
    res.send(destroy);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
