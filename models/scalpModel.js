const { startOfMonth, endOfMonth } = require('date-fns');
const mongoose = require('mongoose');
const Patient = require('./patientModel');
const User = require('./userModel');

const scalpSchema = new mongoose.Schema({
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
    notes: {
        type: String,
    },
    fees: {
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

scalpSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastScalp = await Scalp.findOne({}, { srNo: 1 }).sort({ srNo: -1 });
        this.srNo = lastScalp ? lastScalp.srNo + 1 : 1; // Start with 1 if no records exist
    }
    next();
});

// Define or retrieve existing model to prevent recompilation issues
const Scalp = mongoose.models.Scalp || mongoose.model('Scalp', scalpSchema);

module.exports = Scalp;
