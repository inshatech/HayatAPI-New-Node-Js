
const { param, validationResult } = require("express-validator");

const validateById = [
  param('id')
    .isMongoId()
    .withMessage('Invalid record ID')
];

module.exports = { validateById  }