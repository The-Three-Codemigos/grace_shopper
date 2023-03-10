const client = require('../client');





async function getReviewsByProductId(product_id) {
  try {
    const { rows: reviews } = await client.query(`
      SELECT *
      FROM reviews
      WHERE product_id = $1
    `, [product_id]);

    return reviews;
  } catch (error) {
    throw error;
  }
}

// Create a new review for a product
async function createReview({ product_id, user_id, title, description, rating }) {
  try {
    const { rows: [review] } = await client.query(`
      INSERT INTO reviews (product_id, user_id, title, description, rating)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [product_id, user_id, title, description, rating]);

    return review;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getReviewsByProductId,
  createReview,
};