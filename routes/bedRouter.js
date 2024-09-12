const express = require('express');
const bedController = require('../controllers/bedController');
const validateCreateBed = require('../middlewares/validation/bedValidation');
const validate = require('../middlewares/validate');
const { validateById } = require('../middlewares/validation/commonValidation');
const bedRouter = express.Router();

// Create a new bed record
bedRouter.post('/bed', validateCreateBed, validate, bedController.createBedRecord);

// Get a single bed record by ID
bedRouter.get('/bed/:id', validateById, validate, bedController.getBedRecord);

// Get all bed records (with optional query filters)
bedRouter.get('/bed', bedController.getAllBedRecords);

// Update a bed record by ID
bedRouter.put('/bed/:id', validateById, validate, bedController.updateBedRecord);

// Delete a bed record by ID
bedRouter.delete('/bed/:id', validateById, validate, bedController.deleteBedRecord);

// Update multiple bed records
bedRouter.put('/bed', bedController.updateMultipleBedRecords);

module.exports = bedRouter;
