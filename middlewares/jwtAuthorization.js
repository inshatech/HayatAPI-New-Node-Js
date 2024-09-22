const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { findOne } = require('../services/userService.js');
const { passwordValidation } = require("../middlewares/bcryptHashing.js");
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const algorithm = process.env.ALGORITHM;
const expiresTime = process.env.EXPIRE_TIME;

const signToken = async (mobile, password) => {
  try {
    const d = new Date();
    let time = d.getTime();
    const token = jwt.sign({ mobile: mobile, password: password, time: time }, privateKey, { expiresIn: expiresTime }, { algorithm: algorithm });
    return token;
  } catch (error) {
    return error.message;
  }
}

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, privateKey, algorithm);
    const user = await findOne({ mobile: decoded.mobile, status: 'active' });
    const validation = await passwordValidation(decoded.password, user.password);
    if (!user || !validation) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

const TokenAuthentication = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: 'Access is unauthorized! Please log in and try again'
      });
    }

    const response = await verifyToken(token);

    if (response) {
      next();
    } else {
      return res.status(401).json({
        status: "error",
        message: "Access is unauthorized or Login session time out"
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
      message: "Some things went wrong! Please try again later or contact your administrator",
    });
  }
}

module.exports = { signToken, verifyToken, TokenAuthentication };
