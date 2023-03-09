const express = require('express');
const { requireUser, requireAdmin } = require('./utils');
const apiRouter = express.Router();

const { 
  getReviewsByProductId,
  createReview,
} = require("../db/index");

apiRouter.get('/:productId/reviews', async (req, res, next) => {
  const { productId } = req.params;

  try {
    const reviews = await getReviewsByProductId(productId);
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/:productId/reviews', requireUser, async (req, res, next) => {
  const { productId } = req.params;
  const { title, description, rating } = req.body;
  const { userId } = req;

  try {
    const review = await createReview(productId, {title, description, rating, userId });
    res.send(review);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;