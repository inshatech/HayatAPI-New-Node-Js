const { startOfMonth, endOfMonth } = require('date-fns');
const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');
const Bed = require('./bedModel');

const ipdSchema = new mongoose.Schema({
  srNo: {
    type: Number,
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
  bed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bed',
    required: true,
  },
  bedHistory: [{
    bed: { type: mongoose.Schema.Types.ObjectId, ref: 'Bed' },
    punch: { type: Date, default: Date.now }
  }],
  notes: {
    type: String,
  },
  dod: {
    type: Date,
  },
  is_admitted: {
    type: Boolean,
    default: true,
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

// Middleware to update bedHistory on bed change and auto-increment srNo
ipdSchema.pre('save', async function (next) {
  // Check if 'bed' has been modified
  if (this.isModified('bed') && this.bed) {
    // Append a new entry to 'bedHistory' with current 'bed' and timestamp
    this.bedHistory.push({ bed: this.bed, punch: new Date() });
  }

  // Auto-increment srNo for new records within the current month
  if (this.isNew) {
    const today = new Date();
    const lastRecord = await mongoose.models.IPD.findOne({
      createdAt: {
        $gte: startOfMonth(today),
        $lte: endOfMonth(today),
      }
    }).sort({ srNo: -1 });

    this.srNo = lastRecord ? lastRecord.srNo + 1 : 1;
  }

  next();
});


ipdSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  // Check if 'bed' is modified and is not null
  if (update.bed) {
    // Add new bed history entry with current bed and timestamp
    update.$push = update.$push || {};
    update.$push.bedHistory = { bed: update.bed, punch: new Date() };
  }

  next();
});


// Define or retrieve existing model to prevent recompilation issues
const IPD = mongoose.models.IPD || mongoose.model('IPD', ipdSchema);

module.exports = IPD;
