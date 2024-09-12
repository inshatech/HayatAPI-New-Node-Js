const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Bed = mongoose.model('Bed', bedSchema);

module.exports = Bed;
