const { body, param, query } = require('express-validator');

const validateCreateOPD = [
  body('services').notEmpty().withMessage('Services is required'),
  body('total_amount').notEmpty().withMessage('Total OPD is required'),
  body('staff').notEmpty().withMessage('Staff id is required'),
  body('doctor').notEmpty().withMessage('Doctor id is required'),
];

module.exports = validateCreateOPD;