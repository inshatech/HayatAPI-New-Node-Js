const express = require('express');
const opdController = require('../controllers/opdController');
const { validateById } = require('../middlewares/validation/commonValidation');
const validate = require('../middlewares/validate');
const validateCreateOPD = require('../middlewares/validation/opdValidation.js');
const { TokenAuthentication } = require('../middlewares/jwtAuthorization');
const opdRouter = express.Router();

// Create a new opd record
opdRouter.post('/opd', TokenAuthentication, validateCreateOPD, validate, opdController.createOPDRecord);

// Get a single opd record by ID
opdRouter.get('/opd/:id', TokenAuthentication, validateById, validate, opdController.getOPDRecord);

// Get all opd records (with optional query filters)
opdRouter.get('/opd', TokenAuthentication, opdController.getAllOPDRecords);

// Update a opd record by ID
opdRouter.put('/opd/:id', TokenAuthentication, validateById, validate, opdController.updateOPDRecord);

// Delete a opd record by ID
opdRouter.delete('/opd/:id', TokenAuthentication, validateById, validate, opdController.deleteOPDRecord);

// Update multiple opd records
opdRouter.put('/opd', TokenAuthentication, opdController.updateMultipleOPDRecords);

module.exports = opdRouter;
