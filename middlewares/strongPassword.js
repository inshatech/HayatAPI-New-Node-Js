const { randomInt } = require('crypto');

const generatePassword = async (length) => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = randomInt(0, charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

module.exports = generatePassword;
