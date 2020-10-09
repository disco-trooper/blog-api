const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const debug = require('debug')('auth');
const createError = require('http-errors');

// Sign-Up strategy
// passport.use(
//   'signup',
//   new localStrategy(
//     { passReqToCallback: true },
//     async (req, username, password, done) => {
//       try {
//         const user = await User.create({
//           username,
//           password,
//           firstname: req.body.firstname,
//           lastname: req.body.lastname,
//         });
//         return done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// Log-In strategy
passport.use(
  'login',
  new localStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        return done(null, false, { message: 'Wrong Password' });
      }

      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      return done(error);
    }
  })
);

// Verify token
exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.TOKEN_SECRET, (error, data) => {
      if (error) {
        next(createError(403));
      }
      req.token = bearerToken;
      debug(data);
      next();
    });
  } else {
    next(createError(401));
  }
};
