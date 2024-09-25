const { body, param, query } = require('express-validator');

const validateWhatsAppSend = [
  body('name').notEmpty().withMessage('Name is required'),
  body('mobile').notEmpty().withMessage('Mobile is required'),
  body('message').notEmpty().withMessage('Message is required'),
];

module.exports = validateWhatsAppSend;