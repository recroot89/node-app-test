const { check } = require('express-validator')

exports.courseValidator = [
  check('title')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long')
    .trim(),
  check('price')
    .isNumeric()
    .withMessage('Price must be a number'),
  check('image')
    .isURL()
    .withMessage('Enter image URL'),
  check('description')
    .trim()
]
