const { body, param, query } = require('express-validator');

const validateCreateScalp = [
    body('doa').notEmpty().withMessage('Date time of admission is required'),
    body('staff').notEmpty().withMessage('Staff id is required'),
    body('doctor').notEmpty().withMessage('Doctor id is required'),
];

module.exports = validateCreateScalp;