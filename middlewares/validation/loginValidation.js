const { body, param, query } = require('express-validator');

const validateLogin = [
  body('mobile')
    .notEmpty()
    .withMessage('Mobile no is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

module.exports = validateLogin;