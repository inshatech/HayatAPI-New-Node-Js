const express = require('express');
const patientController = require('../controllers/patientController');
const { validateById } = require('../middlewares/validation/commonValidation');
const validate = require('../middlewares/validate');
const validateCreatePatient = require('../middlewares/validation/patientValidation');
const patientRouter = express.Router();

// Create a new patient record
patientRouter.post('/patient', validateCreatePatient, validate, patientController.createPatientRecord);

// Get a single patient record by ID
patientRouter.get('/patient/:id', validateById, validate, patientController.getPatientRecord);

// Get all patient records (with optional query filters)
patientRouter.get('/patient', patientController.getAllPatientRecords);

// Update a patient record by ID
patientRouter.put('/patient/:id', validateById, validate, patientController.updatePatientRecord);

// Delete a patient record by ID
patientRouter.delete('/patient/:id', validateById, validate, patientController.deletePatientRecord);

// Update multiple patient records
patientRouter.put('/patient', patientController.updateMultiplePatientRecords);

module.exports = patientRouter;
