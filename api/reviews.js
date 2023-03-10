const express = require('express');
const apiRouter = express.Router();
const { requireUser } = require('./utils');

const { Review } = require("../db/index");

apiRouter.get('/:product_id', async (req, res, next) => {
  const { product_id } = req.params;

  try {
    const reviews = await Review.getReviewsByProductId(product_id);
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/:product_id', requireUser, async (req, res, next) => {
  const { product_id } = req.params;
  const { title, description, rating } = req.body;
  const { user_id } = req;

  try {
    const review = await createReview(product_id, {user_id, title, description, rating });
    res.send(review);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;