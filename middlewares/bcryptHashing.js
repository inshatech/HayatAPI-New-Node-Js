const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashingPassword = async (password) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const passwordValidation = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = { passwordValidation, hashingPassword };
