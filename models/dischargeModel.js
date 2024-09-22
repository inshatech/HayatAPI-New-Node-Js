const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');

const dischargeSchema = new mongoose.Schema({
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
  doa: {
    type: Date,
    required: true,
  },
  dod: {
    type: Date,
    required: true,
  },
  bed:{
    type: String,
    required: true,
  },
  tod: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  clinical_notes: {
    type: String,
    required: true,
  },
  investigation: {
    type: String,
    required: true,
  },
  conditionOD: {
    type: Object,
    default: {}
  },
  treatment: {
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

const Discharge = mongoose.model('Discharge', dischargeSchema);

module.exports = Discharge;
