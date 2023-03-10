const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "secret word" } = process.env;

const { User } = require("../db/index");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

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
          name: "AuthorizationHeaderError",
          message: "Authorization token malformed",
        });
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const orderRouter = require("./orders");
apiRouter.use("/orders", orderRouter);

const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

const orderItemsRoute = require("./order-items");
apiRouter.use("/order-items", orderItemsRoute);

const reviewRouter = require('./reviews');
apiRouter.use('/reviews', reviewRouter);

module.exports = apiRouter;
