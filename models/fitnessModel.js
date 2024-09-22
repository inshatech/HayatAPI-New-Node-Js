const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');

const fitnessSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  referer: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  postedFor: {
    type: String,
    required: true,
  },
  complaints: {
    type: Object,
    default: {}
  },
  history: {
    type: Object,
    default: {}
  },
  personal: {
    type: Object,
    default: {}
  },
  examination: {
    type: Object,
    default: {}
  },
  other: {
    type: Object,
    default: {}
  },
  opinion: {
    type: String,
    required: true,
  },
  notes:{
    type: String,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Fitness = mongoose.model('Fitness', fitnessSchema);

module.exports = Fitness;
