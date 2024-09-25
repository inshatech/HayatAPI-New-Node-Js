const express = require('express');
const { sendWhatsApp } = require('../controllers/whatsAppController');
const validateWhatsAppSend = require('../middlewares/validation/validateWhatsAppSend.js');
const { TokenAuthentication } = require('../middlewares/jwtAuthorization.js');
const whatsAppRouter = express.Router();

// Send
whatsAppRouter.post('/whats-app/send', TokenAuthentication, validateWhatsAppSend, sendWhatsApp);


module.exports = whatsAppRouter;
