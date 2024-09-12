const mongoose = require('mongoose');
const User = require('./userModel');

const medicineLibrarySchema = new mongoose.Schema({
  med_name: {
    type: String,
    required: true,
  },
  med_type: {
    type: String,
    required: true,
  },
  dose: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
  },
  timing: {
    type: String,
  },
  when: {
    type: String,
  },
  where: {
    type: String,
  },
  frequency: {
    type: String,
  },
  duration: {
    type: String,
  },
  generic_name: {
    type: String,
  },
  note: {
    type: String,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const MedicineLibrary = mongoose.model('MedicineLibrary', medicineLibrarySchema);

module.exports = MedicineLibrary;
