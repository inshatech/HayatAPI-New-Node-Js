const express = require('express');
const userController = require('../controllers/userController');
const { validateById } = require('../middlewares/validation/commonValidation');
const validate = require('../middlewares/validate');
const validateCreateUser = require('../middlewares/validation/userValidation.js');
const validateLogin = require('../middlewares/validation/loginValidation.js');
const validateResetPassword = require('../middlewares/validation/resetPasswordValidation.js');
const { TokenAuthentication } = require('../middlewares/jwtAuthorization.js');
const userRouter = express.Router();

// Login
userRouter.post('/auth/login', validateLogin, userController.loginUser);
// Reset Password
userRouter.patch('/auth/reset-password', validateResetPassword, userController.resetPassword); //Without authentication (By Self)

// Create a new user record
userRouter.post('/user', TokenAuthentication, validateCreateUser, validate, userController.createUserRecord);

// Get a single user record by ID
userRouter.get('/user/:id', TokenAuthentication, validateById, validate, userController.getUserRecord);

// Get all user records (with optional query filters)
userRouter.get('/user', TokenAuthentication, userController.getAllUserRecords);

// Update a user record by ID
userRouter.put('/user/:id', TokenAuthentication, validateById, validate, userController.updateUserRecord);

// Delete a user record by ID
userRouter.delete('/user/:id', TokenAuthentication, validateById, validate, userController.deleteUserRecord);

// Update multiple user records
userRouter.put('/user', TokenAuthentication, userController.updateMultipleUserRecords);

module.exports = userRouter;
