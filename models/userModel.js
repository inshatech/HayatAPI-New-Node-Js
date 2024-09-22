const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        const mobileRegex = /^[6-9]\d{9}$/;
        return mobileRegex.test(value);
      },
      message: 'Invalid mobile number',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'staff', 'super-admin', 'management'],
    default: 'admin',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  image: {
    type: String,
  },
  designation: {
    type: String,
    enum: ['doctor', 'manager', 'staff', 'administrator'],
    default: '',
  }
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
