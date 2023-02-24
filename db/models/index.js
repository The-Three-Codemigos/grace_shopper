module.exports = {
  // add each model to your exports object here
  // so that you can use them in your express server api routers
  // for example, create a user.js file for a User model
  // and User: require('./user') here
  User: require('./user'),
  Product: require('./product'),
  Order: require('./order'),
  Review: require('./review')
};

// then, in your API, you'll require the appropriate model
// and use its database connectors
// ie User.getUserById(), where user.js had a module.exports
// that looked like this: module.exports = { getUserById, ... }
