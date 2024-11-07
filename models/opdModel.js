const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');

const opdSchema = new mongoose.Schema({
  srNo: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return !isNaN(value.getTime());
      },
      message: 'Invalid date format. Please provide a valid date.',
    },
    default: Date.now,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  services: {
    type: Object,
    default: {},
  },
  complaints: String,
  history: String,
  diagnosis: String,
  vitals: {
    type: Object,
    default: {},
  },
  examination: String,
  medicine: {
    type: Object,
    default: {},
  },
  advise: String,
  next_visit: Date,
  transaction_type: {
    type: String,
    enum: ['cash', 'online'],
    default: 'cash',
    required: true,
  },
  payment_status: {
    type: String,
    enum: ['paid', 'refunded'],
    default: 'paid',
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  notes: String,
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

// Pre-save hook to set the `srNo`
opdSchema.pre('save', async function (next) {
  // Normalize date to remove time part for comparison
  const startOfDay = new Date(this.date);
  startOfDay.setHours(0, 0, 0, 0);

  // Find the last OPD record for the same date
  const lastOpd = await mongoose.model('OPD').findOne({
    date: { $gte: startOfDay, $lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000) }
  }).sort({ srNo: -1 });

  // Increment srNo or set to 1 if no records exist for that day
  this.srNo = lastOpd ? lastOpd.srNo + 1 : 1;

  next();
});

const OPD = mongoose.model('OPD', opdSchema);

module.exports = OPD;
