const express = require('express');
const bedHistoryController = require('../controllers/bedHistoryController');
const validateCreateBedHistory = require('../middlewares/validation/bedHistoryValidation.js');
const validate = require('../middlewares/validate');
const { validateById } = require('../middlewares/validation/commonValidation');
const { TokenAuthentication } = require('../middlewares/jwtAuthorization');
const bedHistoryRouter = express.Router();

// Create a new bedHistory record
bedHistoryRouter.post('/bedHistory', TokenAuthentication, validateCreateBedHistory, validate, bedHistoryController.createBedHistoryRecord);

// Get a single bedHistory record by ID
bedHistoryRouter.get('/bedHistory/:id', TokenAuthentication, validateById, validate, bedHistoryController.getBedHistoryRecord);

// Get all bedHistory records (with optional query filters)
bedHistoryRouter.get('/bedHistory', TokenAuthentication, bedHistoryController.getAllBedHistoryRecords);

// Update a bedHistory record by ID
bedHistoryRouter.put('/bedHistory/:id', TokenAuthentication, validateById, validate, bedHistoryController.updateBedHistoryRecord);

// Delete a bedHistory record by ID
bedHistoryRouter.delete('/bedHistory/:id', TokenAuthentication, validateById, validate, bedHistoryController.deleteBedHistoryRecord);

// Update multiple bedHistory records
bedHistoryRouter.put('/bedHistory', TokenAuthentication, bedHistoryController.updateMultipleBedHistoryRecords);

module.exports = bedHistoryRouter;
