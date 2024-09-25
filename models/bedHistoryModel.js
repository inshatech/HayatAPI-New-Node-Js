const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');

const bedHistorySchema = new mongoose.Schema({
  bedName: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
  {
    timestamps: true
  }
);

const BedHistory = mongoose.model('BedHistory', bedHistorySchema);

module.exports = BedHistory;
