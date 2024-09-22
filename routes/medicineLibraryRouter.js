const express = require('express');
const medicineLibraryController = require('../controllers/medicineLibraryController');
const { validateById } = require('../middlewares/validation/commonValidation');
const validate = require('../middlewares/validate');
const validateCreateMedicineLibrary = require('../middlewares/validation/medicineLibraryValidation');
const { TokenAuthentication } = require('../middlewares/jwtAuthorization');
const medicineLibraryRouter = express.Router();

// Create a new medicineLibrary record
medicineLibraryRouter.post('/medicine-library', TokenAuthentication, validateCreateMedicineLibrary, validate, medicineLibraryController.createMedicineLibraryRecord);

// Get a single medicineLibrary record by ID
medicineLibraryRouter.get('/medicine-library/:id', TokenAuthentication, validateById, validate, medicineLibraryController.getMedicineLibraryRecord);

// Get all medicineLibrary records (with optional query filters)
medicineLibraryRouter.get('/medicine-library', TokenAuthentication, medicineLibraryController.getAllMedicineLibraryRecords);

// Update a medicineLibrary record by ID
medicineLibraryRouter.put('/medicine-library/:id', TokenAuthentication, validateById, validate, medicineLibraryController.updateMedicineLibraryRecord);

// Delete a medicineLibrary record by ID
medicineLibraryRouter.delete('/medicine-library/:id', TokenAuthentication, validateById, validate, medicineLibraryController.deleteMedicineLibraryRecord);

// Update multiple medicineLibrary records
medicineLibraryRouter.put('/medicine-library', TokenAuthentication, medicineLibraryController.updateMultipleMedicineLibraryRecords);

module.exports = medicineLibraryRouter;
