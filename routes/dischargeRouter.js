const express = require('express');
const dischargeController = require('../controllers/dischargeController');
const { validateById } = require('../middlewares/validation/commonValidation');
const validate = require('../middlewares/validate');
const validateCreateDischarge = require('../middlewares/validation/dischargeValidation');
const dischargeRouter = express.Router();

// Create a new discharge record
dischargeRouter.post('/discharge', validateCreateDischarge, validate, dischargeController.createDischargeRecord);

// Get a single discharge record by ID
dischargeRouter.get('/discharge/:id', validateById, validate, dischargeController.getDischargeRecord);

// Get all discharge records (with optional query filters)
dischargeRouter.get('/discharge', dischargeController.getAllDischargeRecords);

// Update a discharge record by ID
dischargeRouter.put('/discharge/:id', validateById, validate, dischargeController.updateDischargeRecord);

// Delete a discharge record by ID
dischargeRouter.delete('/discharge/:id', validateById, validate, dischargeController.deleteDischargeRecord);

// Update multiple discharge records
dischargeRouter.put('/discharge', dischargeController.updateMultipleDischargeRecords);

module.exports = dischargeRouter;
