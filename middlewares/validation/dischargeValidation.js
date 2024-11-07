const { body, param, query } = require('express-validator');

const validateCreateDischarge = [
  body('date').isISO8601().withMessage('Date is required in ISO 8601 format'),
  body('patient').isMongoId().withMessage('Patient is required and should be a valid Mongo ID'),
  body('doa').isISO8601().withMessage('Date and time of admission are required in ISO 8601 format'),
  body('dod').isISO8601().withMessage('Date and time of discharge are required in ISO 8601 format'),
  body('bed').notEmpty().withMessage('Bed is required'),
  body('tod').notEmpty().withMessage('Type of discharge is required'),
  body('diagnosis').notEmpty().withMessage('Diagnosis is required'),
  body('clinical_notes').notEmpty().withMessage('Clinical notes are required'),
  body('investigation').notEmpty().withMessage('Investigation is required'),
  body('treatment').notEmpty().withMessage('Treatment is required'),
  body('staff').isMongoId().withMessage('Staff is required and should be a valid Mongo ID'),
  body('doctor').isMongoId().withMessage('Doctor is required and should be a valid Mongo ID'),
];

module.exports = validateCreateDischarge;
