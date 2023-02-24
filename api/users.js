const apiRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { requireUser } = require("./utils");

const {
  User
  // getUserById
} = require('User')

const jwt = require('jsonwebtoken');

const { requireUser } = require("./utils");

router.post('/register', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const _user = await User.getUserById(id);

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

    router.use((error, req, res, next) => {
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
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    // Do we want to make a function that gets user by emain?
    const user = await getUserByUsername(username);
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      const token = jwt.sign({
        id: user.id,
        email
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });

      res.send({
        user,
        message: "you're logged in!",
        token
      });
    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect'
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /api/users/me

router.get('/me', requireUser, async (req, res, next) => {
  const { email, id } = req.user;

  res.send({
    "id": id,
    "email": email
  });
})

// place your routers here

module.exports = apiRouter;