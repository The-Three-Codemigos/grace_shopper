const express = require('express');
const apiRouter = express.Router();
const { JWT_SECRET = "secret word" } = process.env;

const {
  User
} = require('../db/index')

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

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await User.getUserById(id);
        next();
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});


// place your routers here
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const orderRouter = require('./orders');
apiRouter.use('/orders', orderRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const cartsRouter = require('./carts');
apiRouter.use('/carts', cartsRouter);

// const reviewRouter = require('./review');
// apiRouter.use('/review', reviewRouter);

module.exports = apiRouter;
