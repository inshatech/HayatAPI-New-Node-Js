const { body, param, query } = require('express-validator');

const validateCreateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('mobile').notEmpty().withMessage('Mobile is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('designation').notEmpty().withMessage('Designation is required'),
  body('role').notEmpty().withMessage('Role is required'),
];

module.exports = validateCreateUser;