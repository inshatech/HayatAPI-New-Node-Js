const { body, param, query } = require('express-validator');

const validateCreateMedicineLibrary = [
  body('name').notEmpty().withMessage('Medicine Name is required'),
  body('type').notEmpty().withMessage('Medicine type is required'),
  body('dose').notEmpty().withMessage('Dose is required'),
  body('doctor').notEmpty().withMessage('Doctor id is required'),
];

module.exports = validateCreateMedicineLibrary;