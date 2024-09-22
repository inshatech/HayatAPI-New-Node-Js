const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');

const billSchema = new mongoose.Schema({
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
  Service: {
    type: Object,
    default: {}
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  paid: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    required: true,
    min: 0,  
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

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
