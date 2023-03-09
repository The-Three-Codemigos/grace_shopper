const express = require('express');
const { requireUser, requireAdmin } = require('./utils');
const apiRouter = express.Router();

const { 
  getReviewsByProductId,
  createReview,
} = require("../db/index");

apiRouter.get('/:product_id/reviews', async (req, res, next) => {
  const { product_id } = req.params;

  try {
    const reviews = await getReviewsByProductId(product_id);
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/:product_id/reviews', requireUser, async (req, res, next) => {
  const { product_id } = req.params;
  const { title, description, rating } = req.body;
  const { user_id } = req;

  try {
    const review = await createReview(product_id, {title, description, rating, user_id });
    res.send(review);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;