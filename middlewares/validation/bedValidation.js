const { body, param, query } = require('express-validator');

const validateCreateBed = [
  body('name')
    .notEmpty()
    .withMessage('Bed name is required')
];

module.exports = validateCreateBed;