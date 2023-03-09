const client = require('../client');

async function getReviewsByProductId(productId) {
  try {
    const { rows: reviews } = await client.query(`
      SELECT *
      FROM reviews
      WHERE productId = $1
      ORDER BY created_at DESC
    `, [productId]);

    return reviews;
  } catch (error) {
    throw error;
  }
}

// Create a new review for a product
async function createReview({ productId, userId, title, description, rating }) {
  try {
    const { rows: [review] } = await client.query(`
      INSERT INTO reviews (productId, userId, title, description, rating)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [productId, userId, title, description, rating]);

    return review;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getReviewsByProductId,
  createReview,
};