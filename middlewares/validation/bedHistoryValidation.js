const { body, param, query } = require('express-validator');

const validateCreateBedHistory = [
  body('bedName').notEmpty().withMessage('Bed name is required'),
  body('patient').notEmpty().withMessage('Patient id is required'),
  body('staff').notEmpty().withMessage('Staff id is required'),
];

module.exports = validateCreateBedHistory;