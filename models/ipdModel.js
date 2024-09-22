const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');

const ipdSchema = new mongoose.Schema({
  srNo: {
    type: String,
    required: true,
  },
  doa: {
    type: Date,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  bed:{
    type: String,
    required: true,
  },
  notes:{
    type: String,
  },
  dod: {
    type: Date,
    required: true,
  },
  is_admitted: {
    type: Boolean,
    default: true
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

const IPD = mongoose.model('IPD', ipdSchema);

module.exports = IPD;
