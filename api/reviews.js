const express = require('express');
const { requireUser } = require('./utils');
const apiRouter = express.Router();

const { Review } = require("../db/index");


apiRouter.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.getAllReviews();
    res.send(reviews);
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.getReviewsByProductId(productId);
    console.log(await Review.getReviewsByProductId(productId))

    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/:productId', requireUser, async (req, res, next) => {
  const { productId } = req.params;
  const { title, description, rating } = req.body;
  const { userId } = req.user.id;

  try {
    const review = await Review.createReview({ productId, userId, title, description, rating });
    res.send(review);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;