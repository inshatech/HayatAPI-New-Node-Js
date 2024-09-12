const { body, param, query } = require('express-validator');

const validateCreateDischarge = [
  body('srNo').notEmpty().withMessage('SrNo is required'),
  body('date').isDate().withMessage('Date is required'),
  body('patient').isMongoId().withMessage('Patient is required'),
  body('doa').isDate().withMessage('Date time of admission is required'),
  body('dod').isDate().withMessage('Date time of discharge is required'),
  body('bed').notEmpty().withMessage('Bed is required'),
  body('tod').notEmpty().withMessage('Type of discharge is required'),
  body('diagnosis').notEmpty().withMessage('Diagnosis is required'),
  body('clinical_notes').notEmpty().withMessage('Clinical notes is required'),
  body('investigation').notEmpty().withMessage('Investigation is required'),
  body('treatment').notEmpty().withMessage('Treatment is required'),
  body('staff').isMongoId().withMessage('Staff is required'),
  body('doctor').isMongoId().withMessage('Doctor is required'),
];

module.exports = validateCreateDischarge;