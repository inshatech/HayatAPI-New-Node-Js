const { hashingPassword, passwordValidation } = require('../middlewares/bcryptHashing');
const generatePassword = require('../middlewares/strongPassword');
const userService = require('../services/userService');
const whatsApp = require('../plugins/whatsApp/whatsApp');
const { sendAccountDetails, sendOTP, generateOTP } = require('../middlewares/communication');
const { registrationTemplate, otpTemplate, passwordTemplate } = require('../utils/config');

const jwtAuth = require('../middlewares/jwtAuthorization.js');

const createUserRecord = async (req, res) => {
  try {
    const query = req.body;

    //Generate a unique password
    const password = await generatePassword(8);
    //Hashing the password
    const hashedPassword = await hashingPassword(password);

    const result = await userService.create({ ...query, password: hashedPassword });
    if (result.success) {
      const message = registrationTemplate(password);
      const messageSend = await whatsApp.send(query.mobile, message, query.name)
      //const sendEmail = await sendAccountDetails(password, query.mobile, query.email, query.name)
      return res.status(201).json({ ...result, status: { whatsApp: messageSend.status }});
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const query = req.body;
    //1 Check if user is already available
    const response = await userService.findOneInternal({ mobile: query.mobile });
    let user = response.data;
    if (!user) {
      return res.status(400).json({ success: false, message: `Please check your login credentials and try again.` });
    }

    //2 Check if user is active
    if (!user.isActive) {
      return res.status(400).json({ success: false, message: `Your account has been temporarily suspended or disabled.` });
    }
    //3 Checking valid password
    const isValidPassword = await passwordValidation(query.password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ success: false, message: `Please check your login credentials and try again.` });
    }

    //Generate jwt token
    const jwtToken = await jwtAuth.signToken(query.mobile, query.password);

    if (jwtToken) {

      //Generate base64 encoded and sending (OTP) 
      const OTP = await generateOTP();
      const encOTP = btoa(OTP);

      //Sending OTP with WhatsApp
      const message = await otpTemplate(OTP);
      await whatsApp.send(query.mobile, message, user.name)

      user = user.toObject();
      delete user.password; // Ensure password is not returned

      res.status(200).json({
        success: true,
        message: 'Login successfully',
        otp: encOTP,
        token: jwtToken,
        details: user,
      });

    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { mobile } = req.body;

    //1 Check if user is already available
    const response = await userService.findOne({ mobile: mobile });
    const user = response.data;

    if (!user) {
      return res.status(400).json({ success: false, message: `Please check your login credentials and try again.` });
    }

    //2 Check if user is active
    if (!user.isActive) {
      return res.status(400).json({ success: false, message: `Your account has been temporarily suspended or disabled.` });
    }

    //3 Generate a new password
    const password = await generatePassword(8);

    //Sending OTP with WhatsApp
    const message = await passwordTemplate(password);
    await whatsApp.send(mobile, message, user.name)

    //Hashing the password
    const hashedPassword = await hashingPassword(password);

    //5 Change password
    const result = await userService.findOneAndUpdate(user._id, { password: hashedPassword });
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }

  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const getUserRecord = async (req, res) => {
  try {
    const query = req.params.id; // Assuming you use params to identify the user record
    const result = await userService.findOne({ _id: query });
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const getAllUserRecords = async (req, res) => {
  try {
    const query = req.query; // Assuming query parameters for filtering
    const result = await userService.findAll(query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const updateUserRecord = async (req, res) => {
  try {
    const _id = req.params.id; // Assuming the ID is passed as a URL parameter
    const query = req.body;
    const result = await userService.findOneAndUpdate(_id, query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const deleteUserRecord = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await userService.findByIdAndDelete(_id);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const updateMultipleUserRecords = async (req, res) => {
  try {
    const where = req.body.where; // The condition for selecting records
    const query = req.body.query; // The update data
    const result = await userService.updateMany(where, query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

module.exports = {
  createUserRecord,
  getUserRecord,
  getAllUserRecords,
  updateUserRecord,
  deleteUserRecord,
  updateMultipleUserRecords,
  loginUser,
  resetPassword
}
