// grab our db client connection to use with our adapters
const client = require("../client");

async function getAllReviews() {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows } = await client.query(`
      SELECT id, "productId", "userId", "text" 
      FROM reviews;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getReviewsByProductId(id) {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM reviews
      WHERE productId=${id};
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

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
  getAllReviews,
  createReview,
  getReviewsByProductId
};
