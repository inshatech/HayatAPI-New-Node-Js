const { generateOTP } = require("../middlewares/communication");

const app_name = 'HAYAT HOSPITAL';

const registrationTemplate = (password) => {
  return `*Registration successful.* \\n\\nUse the following details to login to your account. \\n\\nPassword: *${password}*`;
}

const otpTemplate = async (OTP) => {
  return `*Your One-Time Password (OTP)* \\n\\nPlease use the following OTP to proceed: \\n\\n *${OTP}*`;
}

const passwordTemplate = async (password) => {
  return `*Password changed successfully.* \\n\\nPassword: *${password}*`;
}

module.exports = {
  app_name,
  registrationTemplate,
  otpTemplate,
  passwordTemplate
}