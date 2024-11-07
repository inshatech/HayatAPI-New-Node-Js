const express = require('express');
const ipdController = require('../controllers/ipdController.js');
const { validateById } = require('../middlewares/validation/commonValidation.js');
const validate = require('../middlewares/validate.js');
const validateCreateIPD = require('../middlewares/validation/ipdValidation.js');
const { TokenAuthentication } = require('../middlewares/jwtAuthorization.js');
const ipdRouter = express.Router();

// Create a new ipd record
ipdRouter.post('/ipd', TokenAuthentication, validateCreateIPD, validate, ipdController.createIPDRecord);

// Get a single ipd record by ID
ipdRouter.get('/ipd/:id', TokenAuthentication, validateById, validate, ipdController.getIPDRecord);

// Get all ipd records (with optional query filters)
ipdRouter.get('/ipd', TokenAuthentication, ipdController.getAllIPDRecords);

// Update a ipd record by ID
ipdRouter.put('/ipd/:id', TokenAuthentication, validateById, validate, ipdController.updateIPDRecord);

// Delete a ipd record by ID
ipdRouter.delete('/ipd/:id', TokenAuthentication, validateById, validate, ipdController.deleteIPDRecord);

// Update multiple ipd records
ipdRouter.put('/ipd', TokenAuthentication, ipdController.updateMultipleIPDRecords);

//Switch bed
ipdRouter.patch('/ipd/:id', TokenAuthentication, validateById, validate, ipdController.switchBed);

module.exports = ipdRouter;
