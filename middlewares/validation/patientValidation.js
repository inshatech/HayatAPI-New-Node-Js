const { body, param, query } = require('express-validator');

const validateCreatePatient = [
  body('name').notEmpty().withMessage('Name is required'),
  body('mobile').notEmpty().withMessage('Mobile is required'),
  body('age').notEmpty().withMessage('Age is required'),
  body('sex').notEmpty().withMessage('Gender is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('doctor').notEmpty().withMessage('Doctor id is required'),
];

module.exports = validateCreatePatient;