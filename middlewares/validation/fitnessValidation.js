const { body, param, query } = require('express-validator');

const validateCreateFitness = [
  body('referer').notEmpty().withMessage('referer is required'),
  body('date').isDate().withMessage('Date is required'),
  body('patient').isMongoId().withMessage('Patient is required'),
  body('postedFor').notEmpty().withMessage('Posted for is required'),
  body('complaints').isObject().withMessage('Complaints is required'),
  body('history').isObject().withMessage('History is required'),
  body('personal').isObject().withMessage('Personal is required'),
  body('examination').isObject().withMessage('Examination is required'),
  body('other').isObject().withMessage('Other is required'),
  body('opinion').notEmpty().withMessage('Opinion is required'),
  body('staff').isMongoId().withMessage('Staff is required'),
  body('doctor').isMongoId().withMessage('Doctor is required'),
];

module.exports = validateCreateFitness;