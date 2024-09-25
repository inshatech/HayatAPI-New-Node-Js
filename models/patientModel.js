const mongoose = require('mongoose');

// Define the patient schema
const patientSchema = new mongoose.Schema({
  uhid: {
    type: String,
    unique: true, // Ensure UHID is unique
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  notes: {
    type: String,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Function to generate the next UHID based on last UHID
const getNextUHID = async (doctorId) => {
  const lastPatient = await mongoose.model('Patient').findOne({ doctor: doctorId }).sort({ uhid: -1 });

  if (!lastPatient) {
    return 'A0001'; // Start from A0001 if no previous UHID
  }

  let lastUHID = lastPatient.uhid;
  let prefix = lastUHID.charAt(0); // A, B, C, etc.
  let number = parseInt(lastUHID.substring(1)); // Extract number part

  if (number < 9999) {
    number++;
  } else {
    prefix = String.fromCharCode(prefix.charCodeAt(0) + 1); // Increment the prefix (A -> B -> C)
    number = 1; // Reset the number part to 0001
  }

  const nextUHID = `${prefix}${number.toString().padStart(4, '0')}`; // Format the next UHID
  return nextUHID;
};

// Middleware to set UHID before saving
patientSchema.pre('save', async function (next) {
  if (!this.uhid) {
    try {
      this.uhid = await getNextUHID(this.doctor); // Assign the next UHID based on the doctor
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
