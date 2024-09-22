const { body, param, query } = require('express-validator');

const validateResetPassword = [
  body('mobile').notEmpty().withMessage('Mobile is required'),
];

module.exports = validateResetPassword;