const { mail, fromText, from } = require('./mailConfig.js');

const sendEmail = async (sendTo, subject, message) => {
  try {
    return await mail.sendMail({
      from: `"${fromText}" <${from}>`, //`"EduNexGen SaaS - School Management System" <${process.env.SMTP_USER}>`
      to: sendTo,
      subject: subject,
      html: message,
    });
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
};

module.exports = sendEmail;
