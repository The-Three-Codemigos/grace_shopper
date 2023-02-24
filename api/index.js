const apiRouter = require('express').Router();
// const {
//   User
// } = require('User')

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
// const usersRouter = require(User);
// apiRouter.use('/users', usersRouter);

// const orderRouter = require('./orders');
// apiRouter.use('/orders', orderRouter);

// const productsRouter = require('./products');
// apiRouter.use('/products', productsRouter);

// const reviewRouter = require('./review');
// apiRouter.use('/review', reviewRouter);

module.exports = apiRouter;
