const express = require('express');
const dischargeController = require('../controllers/dischargeController');
const { validateById } = require('../middlewares/validation/commonValidation');
const validate = require('../middlewares/validate');
const validateCreateDischarge = require('../middlewares/validation/dischargeValidation');
const { TokenAuthentication } = require('../middlewares/jwtAuthorization');
const dischargeRouter = express.Router();

// Create a new discharge record
dischargeRouter.post('/discharge', TokenAuthentication, validateCreateDischarge, validate, dischargeController.createDischargeRecord);

// Search discharge records
dischargeRouter.get('/discharge', TokenAuthentication, dischargeController.searchDischarge);

// Get a single discharge record by ID
dischargeRouter.get('/discharge/single/:id', TokenAuthentication, validateById, validate, dischargeController.getDischargeRecord);

// Get all discharge records (with optional query filters)
dischargeRouter.get('/discharge/all', TokenAuthentication, dischargeController.getAllDischargeRecords);

// Update a discharge record by ID
dischargeRouter.put('/discharge/:id', TokenAuthentication, validateById, validate, dischargeController.updateDischargeRecord);

// Delete a discharge record by ID
dischargeRouter.delete('/discharge/:id', TokenAuthentication, validateById, validate, dischargeController.deleteDischargeRecord);

// Update multiple discharge records
dischargeRouter.put('/discharge', TokenAuthentication, dischargeController.updateMultipleDischargeRecords);

module.exports = dischargeRouter;
