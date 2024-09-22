const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const generalConfig = require('../../utils/config.js')

dotenv.config();

const from = process.env.SMTP_USER
const fromText = generalConfig.app_name + ' | Powered by: Insha Technologies'

const mail = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // Ensure boolean is handled properly
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

mail.verify((error) => {
  if (error) {
    console.error("Error in mail server verification:", error.message);
  } else {
    console.log("Mail server is ready to send messages");
  }
});

module.exports = { mail, from, fromText };
