const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');

const opdSchema = new mongoose.Schema({
  srNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  services: {
    type: Object,
    default: {}
  },
  complaints: {
    type: String,
  },
  history: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
  vitals: {
    type: Object,
    default: {}
  },
  examination: {
    type: String,
  },
  medicine: {
    type: Object,
    default: {}
  },
  advise: {
    type: String,
  },
  next_visit: {
    type: Date,
  },
  transaction_type: {
    type: String,
    enum: ['cash', 'online'],
    required: true
  },
  t_amount:{
    type: Number,
    required: true,
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

const OPD = mongoose.model('OPD', opdSchema);

module.exports = OPD;
