const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please try once again.',
      errors: errors.array().map(err => ({ msg: err.msg, path: err.path })), // Corrected object syntax and used err.param for the field name
    });
  }
  next();
};

module.exports = validate;
