const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');

const opdSchema = new mongoose.Schema({
  srNo: {
    type: Number,
  },
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
  services: {
    type: Array,
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
    default: 'cash',
    required: true
  },
  payment_status: {
    type: String,
    enum: ['paid', 'refunded'],
    default: 'paid',
    required: true
  },
  total_amount: {
    type: Number,
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
},
  {
    timestamps: true
  }
);

// Pre-save hook to set the `srNo`
opdSchema.pre('save', async function (next) {
  const opd = this;
  const startOfDay = new Date(opd.date.setHours(0, 0, 0, 0));

  // Find the last entry of the day
  const lastOpd = await mongoose.model('OPD').findOne({
    date: { $gte: startOfDay }
  }).sort({ srNo: -1 });

  if (lastOpd) {
    opd.srNo = lastOpd.srNo + 1;
  } else {
    opd.srNo = 1;
  }

  next();
});

const OPD = mongoose.model('OPD', opdSchema);

module.exports = OPD;
