const express = require('express');
const fitnessController = require('../controllers/fitnessController');
const { validateById } = require('../middlewares/validation/commonValidation');
const validate = require('../middlewares/validate');
const validateCreateFitness = require('../middlewares/validation/fitnessValidation');
const fitnessRouter = express.Router();

// Create a new fitness record
fitnessRouter.post('/fitness', validateCreateFitness, validate,  fitnessController.createFitnessRecord);

// Get a single fitness record by ID
fitnessRouter.get('/fitness/:id', validateById, validate, fitnessController.getFitnessRecord);

// Get all fitness records (with optional query filters)
fitnessRouter.get('/fitness', fitnessController.getAllFitnessRecords);

// Update a fitness record by ID
fitnessRouter.put('/fitness/:id', validateById, validate, fitnessController.updateFitnessRecord);

// Delete a fitness record by ID
fitnessRouter.delete('/fitness/:id', validateById, validate, fitnessController.deleteFitnessRecord);

// Update multiple fitness records
fitnessRouter.put('/fitness', fitnessController.updateMultipleFitnessRecords);

module.exports = fitnessRouter;
