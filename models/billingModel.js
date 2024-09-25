const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');

const billingSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now, // Automatically set to current date and time
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
  services: {
    type: Array,
    default: []
  },
  total: {
    type: Number,
    default: 0,
    required: true,
    min: 0,
  },
  paid: {
    type: Number,
    default: 0,
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

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;
