const { body, param, query } = require('express-validator');

const validateCreateIPD = [
  body('doa').notEmpty().withMessage('Date time of admission is required'),
  body('bed').notEmpty().withMessage('Bed No. is required'),
  body('staff').notEmpty().withMessage('Staff id is required'),
  body('doctor').notEmpty().withMessage('Doctor id is required'),
];

module.exports = validateCreateIPD;