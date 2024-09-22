const { body, param, query } = require('express-validator');

const validateCreateOPD = [
  body('srNo').notEmpty().withMessage('Day Sr.No. is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('mobile').notEmpty().withMessage('Mobile is required'),
  body('age').notEmpty().withMessage('Age is required'),
  body('sex').notEmpty().withMessage('Gender is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('services').notEmpty().withMessage('Services is required'),
];

module.exports = validateCreateOPD;