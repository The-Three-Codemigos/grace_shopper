const express = require('express');
const apiRouter = express.Router();
const bcrypt = require('bcrypt');
const { requireUser } = require("./utils");

// const {
//   User
// } = require('../api/index')

const {
  getUserById, getUserByEmail
} = require('../db/models/user')

const jwt = require('jsonwebtoken');

apiRouter.post('/register', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const _user = await getUserById(id);

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

    const user = await createUser({
      firstName,
      lastName,
      email,
      password
    });

    const token = jwt.sign({
      id: user.id,
      firstName
    }, process.env.JWT_SECRET, {
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

  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/users/login
// apiRouter.post('/login', async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     next({
//       name: "MissingCredentialsError",
//       message: "Please supply both a username and password"
//     });
//   }
//   try {
//     const user = await getUserByEmail(email);
//     const isValid = await bcrypt.compare(password, user.password);

//     if (isValid) {
//       const token = jwt.sign({
//         id: user.id,
//         email
//       }, process.env.JWT_SECRET, {
//         expiresIn: '1w'
//       });

//       res.send({
//         user,
//         message: "you're logged in!",
//         token
//       });
//     } else {
//       next({
//         name: 'IncorrectCredentialsError',
//         message: 'Username or password is incorrect'
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

apiRouter.get('/', async (req, res, next) => {
  // const { email, id } = req.user;
  res.send({
    message: "Users api"
  });
})

apiRouter.post('/login', async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    res.send({
      message: `${id}`
    });
  }

})

// GET /api/users/me
apiRouter.get('/me', requireUser, async (req, res, next) => {
  const { email, id } = req.user;

  res.send({
    "id": id,
    "email": email
  });
})

// place your routers here

module.exports = apiRouter;