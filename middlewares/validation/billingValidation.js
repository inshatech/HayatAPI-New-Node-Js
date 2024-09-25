const { body, param, query } = require('express-validator');

const validateCreateBilling = [
  body('doa').notEmpty().withMessage('Date time of admission is required'),
  body('dod').notEmpty().withMessage('Date time of discharge is required'),
  body('bed').notEmpty().withMessage('Bed No. is required'),
  body('Service').notEmpty().withMessage('Services is required'),
  body('total').notEmpty().withMessage('Total amount is required'),
  body('staff').notEmpty().withMessage('Staff id is required'),
  body('doctor').notEmpty().withMessage('Doctor id is required'),
];

module.exports = validateCreateBilling;