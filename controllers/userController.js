const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// GET Login Form
exports.getLoginForm = async (req, res, next) => {
  res.send('GET Login FORM');
};

// POST Login Form
exports.postLoginForm = [
  body('username').escape(),
  body('password').escape(),
  async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err) {
          const error = new Error('An error occurred.');
          return next(error);
        }
        if (!user) {
          const error = new Error('User not found');
          return next(error);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, username: user.username };
          const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);
          return res.json({ token });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  },
];

// // GET Signup Form
// exports.getSignupForm = async (req, res, next) => {
//   res.send('GET Signup FORM');
// };

// // POST Signup Form
// exports.postSignupForm = [
//   passport.authenticate('signup', { session: false }),
//   async (req, res, next) => {
//     res.json({
//       message: 'Signup successful',
//       user: req.user,
//     });
//   },
// ];
