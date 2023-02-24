// grab our db client connection to use with our adapters
const client = require('../client');

async function getAllReviews() {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows } = await client.query(`
      SELECT id, "productId", "reviewUserId", "reviewText" 
      FROM reviews;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createReview({ 
  productId, 
  userId,
  text,
}) {
  try {
    const { rows: [ review ] } = await client.query(`
      INSERT INTO reviews("productId", "userId", "text") 
      VALUES($1, $2, $3) 
      RETURNING *;
    `, [productId, userId, text]);

    return review;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // add your database adapter functions here
  getAllReviews,
  createReview,
};