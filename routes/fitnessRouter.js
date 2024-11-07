const express = require('express');
const fitnessController = require('../controllers/fitnessController');
const { validateById } = require('../middlewares/validation/commonValidation');
const validate = require('../middlewares/validate');
const validateCreateFitness = require('../middlewares/validation/fitnessValidation');
const { TokenAuthentication } = require('../middlewares/jwtAuthorization');
const fitnessRouter = express.Router();

// Create a new fitness record
fitnessRouter.post('/fitness', TokenAuthentication, validateCreateFitness, validate,  fitnessController.createFitnessRecord);

// Search fitness records
fitnessRouter.get('/fitness', TokenAuthentication, fitnessController.searchFitness);

// Get a single fitness record by ID
fitnessRouter.get('/fitness/single/:id', TokenAuthentication, validateById, validate, fitnessController.getFitnessRecord);

// Get all fitness records (with optional query filters)
fitnessRouter.get('/fitness/all', TokenAuthentication, fitnessController.getAllFitnessRecords);

// Update a fitness record by ID
fitnessRouter.put('/fitness/:id', TokenAuthentication, validateById, validate, fitnessController.updateFitnessRecord);

// Delete a fitness record by ID
fitnessRouter.delete('/fitness/:id', TokenAuthentication, validateById, validate, fitnessController.deleteFitnessRecord);

// Update multiple fitness records
fitnessRouter.put('/fitness', TokenAuthentication, fitnessController.updateMultipleFitnessRecords);

module.exports = fitnessRouter;
