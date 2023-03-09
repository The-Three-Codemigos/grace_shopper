const express = require('express');
const apiRouter = express.Router();
const bcrypt = require('bcrypt');
const { requireUser } = require("./utils");
const { JWT_SECRET = "secret word" } = process.env;

const {
  User
} = require('../db/index')

const jwt = require('jsonwebtoken');

apiRouter.post('/register', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName)
  console.log(lastName)
  console.log(email)
  console.log(password)
  try {
    const _user = await User.getUserByEmail(email);
    if (_user) {
      next({
        name: 'UserTakenError',
        message: 'UserTakenError',
        error: 'UserTakenError'
      });
    }

    if (password.length < 8) {
      next({
        name: 'PasswordTooShortError',
        message: 'PasswordTooShortError',
        error: 'PasswordTooShortError'
      });
    }

    const user = await User.createUser({
      firstName,
      lastName,
      email,
      password
    });

    const token = jwt.sign({
      id: user.id,
      email
    }, JWT_SECRET, {
      expiresIn: '1w'
    });

    apiRouter.use((error, req, res, next) => {
      res.send(error);
    });
    res.send({
      user,
      message: "thank you for signing up",
      token
    });

  } catch (error) {
    next(ErrorEvent);
  }
});

// POST /api/users/login
apiRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }
  try {
    const user = await User.getUserByEmail(email);
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {

      const token = jwt.sign({
        id: user.id,
        email
      }, JWT_SECRET, {
        expiresIn: '1w'
      });

      res.send({
        user,
        message: "you're logged in!",
        token
      });
    }
    else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect'
      });
    }
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.send({
      message: users
    });
  } catch (error) {
    next(error)
  }
})

// GET /api/users/me
apiRouter.get('/me', requireUser, async (req, res, next) => {
  const user = await User.getUserById(req.user.id)
  console.log(user)
  try {
    res.send({
      "user": req.user
    });
  } catch (error) {
    next(error)
  }
})

module.exports = apiRouter;