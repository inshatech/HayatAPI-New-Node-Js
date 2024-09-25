const express = require('express');
const billingController = require('../controllers/billingController.js');
const { validateById } = require('../middlewares/validation/commonValidation.js');
const validate = require('../middlewares/validate.js');
const validateCreateBilling = require('../middlewares/validation/billingValidation.js');
const { TokenAuthentication } = require('../middlewares/jwtAuthorization.js');
const billingRouter = express.Router();

// Create a new billing record
billingRouter.post('/billing', TokenAuthentication, validateCreateBilling, validate, billingController.createBillingRecord);

// Get a single billing record by ID
billingRouter.get('/billing/:id', TokenAuthentication, validateById, validate, billingController.getBillingRecord);

// Get all billing records (with optional query filters)
billingRouter.get('/billing', TokenAuthentication, billingController.getAllBillingRecords);

// Update a billing record by ID
billingRouter.put('/billing/:id', TokenAuthentication, validateById, validate, billingController.updateBillingRecord);

// Delete a billing record by ID
billingRouter.delete('/billing/:id', TokenAuthentication, validateById, validate, billingController.deleteBillingRecord);

// Update multiple billing records
billingRouter.put('/billing', TokenAuthentication, billingController.updateMultipleBillingRecords);

module.exports = billingRouter;
