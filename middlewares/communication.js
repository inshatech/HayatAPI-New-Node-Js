const sendEmail = require("../plugins/mail/sendEmail.js");
const dotenv = require('dotenv');
const { randomInt } = require('crypto');
const { format } = require("date-fns");

dotenv.config();
const societyName = (process.env.ORGANIZATION_NAME || '').replace(/_/g, " ");

// Email Template Parts
const emailTemplate = {
  head: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Notification</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); text-align: center; }
        h1 { color: #333333; }
        p { color: #666666; font-size: 18px; margin-top: 20px; }
        .otp-code { font-size: 28px; color: #ff6b6b; margin-top: 20px; padding: 10px 20px; border: 2px solid #ff6b6b; border-radius: 5px; display: inline-block; }
        .footer { margin-top: 30px; text-align: center; color: #777777; font-size: 14px; }
        .footer a { color: #2e86de; text-decoration: none; }
        .footer a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
  `,
  footer: `
      <p class="footer">This email was sent automatically. Please do not reply.</p>
      <p class="footer">Proudly Powered By:<a href="https://www.inshatech.com" target="_blank">Insha Technologies</a></p>
    </div>
    </body>
    </html>
  `,
  commonFooter: `
    <p>This OTP is valid for 30 minutes. If you did not request this OTP, please ignore this email.</p>
  `
};

// OTP Generator
const generateOTP = async (length = 6) => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

// Send Email Helper
const sendFormattedEmail = async (email, subject, messageBody) => {
  const emailMessage = `${emailTemplate.head}<div class="container">${messageBody}${emailTemplate.footer}`;
  const response = await sendEmail(email, subject, emailMessage);
  return response;
};

// New Account Email
const sendAccountDetails = async (password, mobile = "", email = "", name = "") => {
  const messageBody = `
    <h1>Registration Successful</h1>
    <h3>Dear ${name}</h3>
    <p>Use the following details to login to your account.</p>
    <p>URL: ${''}</p>
    <p>User: ${mobile}</p>
    <p>Password: <div class="otp-code">${password}</div></p>
  `;
  const response = await sendFormattedEmail(email, 'New User Registration', messageBody);
  return response
};

// Change Password Email
const sendChangePassword = async (password, mobile = "", email = "") => {
  const messageBody = `
    <h1>Password Changed Successfully</h1>
    <p>New Password: <div class="otp-code">${password}</div></p>
  `;
  await sendFormattedEmail(email, 'Password Change Successfully', messageBody);
};

// OTP Verification Email
const sendOTP = async (mobile = "", email = "") => {
  const OTP = await generateOTP();
  const messageBody = `
    <h1>Your One-Time Password (OTP)</h1>
    <p>Please use the following OTP to proceed:</p>
    <div class="otp-code">${OTP}</div>
    ${emailTemplate.commonFooter}
  `;
  await sendFormattedEmail(email, 'OTP Verification', messageBody);
  return OTP;
};

// Unlock Transfer Certificate Email
const unLockTC = async (mobile = "", email = "", query) => {
  const OTP = await generateOTP();
  const messageBody = `
    <h1>Transfer Certificate Modification Attempt</h1>
    <p>Admission No: ${query.admission_no}</p>
    <p>T.C No: ${query.tc_number}</p>
    <p>Modified By: ${query.user}</p>
    <div class="otp-code">${OTP}</div>
    ${emailTemplate.commonFooter}
  `;
  await sendFormattedEmail(email, 'Transfer Certificate Unlock OTP', messageBody);
  return OTP;
};

// Account Activation Email
const accountActivation = async (mobile = "", email = "", query) => {
  const messageBody = `
    <h1>Congratulations! Your account has been activated successfully</h1>
    <p>Institute: ${query.institute_name}</p>
    <p>UDISE: ${query.udise}</p>
    <p>Account Valid Until: ${query.newRenewalDt}</p>
    <p>Order ID: ${query.orderId}</p>
    <p>Transaction Id: ${query.transactionId}</p>
    <div class="otp-code">Rs: ${query.amount}/-</div>
  `;
  await sendFormattedEmail(email, 'Account Activation Successful', messageBody);
};

// Account Suspension Email
const accountSuspension = async (mobile = "", email = "", query) => {
  const messageBody = `
    <h1>Your Account Has Been Suspended</h1>
    <p>Institute: ${query.institute_name}</p>
    <p>UDISE: ${query.udise}</p>
    <p>Expired On: ${query.nextRenewalDate ? format(query.nextRenewalDate, 'dd-MM-yyyy') : 'N/A'}</p>
    <div class="otp-code">EXPIRED</div>
  `;
  await sendFormattedEmail(email, 'Account Suspension Notice', messageBody);
};

// Automation Email
const automation = async (email = "", query) => {
  const messageBody = `
    <h1>Account Stats</h1>
    <table style="border: 1px solid black; border-collapse: collapse;">
      <tr><th>Total</th><th>Suspended</th><th>Active</th></tr>
      <tr><td>${query.stats.total}</td><td>${query.stats.inactive}</td><td>${query.stats.active}</td></tr>
    </table>
    <h1>Accounts Expiring/Expired</h1>
    <table style="border: 1px solid black; border-collapse: collapse;">
      ${query.details.map(item => `
        <tr>
          <td>${item.institute}</td>
          <td>${item.mobile}</td>
          <td>${item.status}</td>
          <td>${item.pending}</td>
          <td>${item.expireDate}</td>
        </tr>`).join("")}
    </table>
  `;
  await sendFormattedEmail(email, 'Automation Run Successfully', messageBody);
};

module.exports = { sendChangePassword, sendOTP, generateOTP, sendAccountDetails, unLockTC, accountActivation, accountSuspension, automation };
