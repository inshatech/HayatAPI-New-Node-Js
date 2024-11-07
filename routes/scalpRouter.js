const express = require('express');
const scalpController = require('../controllers/scalpController.js');
const { validateById } = require('../middlewares/validation/commonValidation.js');
const validate = require('../middlewares/validate.js');
const validateCreateScalp = require('../middlewares/validation/scalpValidation.js');
const { TokenAuthentication } = require('../middlewares/jwtAuthorization.js');
const scalpRouter = express.Router();

// Create a new scalp record
scalpRouter.post('/scalp', TokenAuthentication, validateCreateScalp, validate, scalpController.createScalpRecord);

// Get a single scalp record by ID
scalpRouter.get('/scalp/:id', TokenAuthentication, validateById, validate, scalpController.getScalpRecord);

// Get all scalp records (with optional query filters)
scalpRouter.get('/scalp', TokenAuthentication, scalpController.getAllScalpRecords);

// Update a scalp record by ID
scalpRouter.put('/scalp/:id', TokenAuthentication, validateById, validate, scalpController.updateScalpRecord);

// Delete a scalp record by ID
scalpRouter.delete('/scalp/:id', TokenAuthentication, validateById, validate, scalpController.deleteScalpRecord);

// Update multiple scalp records
scalpRouter.put('/scalp', TokenAuthentication, scalpController.updateMultipleScalpRecords);

module.exports = scalpRouter;
