const { check } = require('express-validator')
const User = require('../models/user')

exports.registerValidator = [
  check('email')
    .isEmail()
    .withMessage('Enter the correct email address')
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value })
        if (user) {
          return Promise.reject(new Error('Email already in use'))
        }
      } catch (err) {
        console.log(err)
      }
    }),
  check('password')
    .isLength({ min: 6, max: 56 })
    .withMessage('Password must be at least 6 characters long')
    .isAlphanumeric()
    .withMessage('Password must contain only alphanumeric characters')
    .custom((value, { req }) => {
      if (value !== req.body.confirm) {
        throw new Error('Password must match')
      }
    }),
  check('name')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
]
