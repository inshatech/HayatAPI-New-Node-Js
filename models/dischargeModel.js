const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');
const Bed = require('./bedModel');

const dischargeSchema = new mongoose.Schema({
  srNo: {
    type: Number, // Changed to Number for easier incrementing
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
  bed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bed',
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
  notes: {
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
}, { timestamps: true });

// Pre-save hook to set srNo
dischargeSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastDischarge = await Discharge.findOne({}, { srNo: 1 }).sort({ srNo: -1 });
    this.srNo = lastDischarge ? lastDischarge.srNo + 1 : 1; // Start with 1 if no records exist
  }
  next();
});

const Discharge = mongoose.model('Discharge', dischargeSchema);

module.exports = Discharge;
