const mongoose = require('mongoose');
const User = require('./userModel');

// Helper function to increment alphabetical sequences (e.g., 'A' to 'Z', then 'AA' to 'AZ', etc.)
function incrementAlphaSequence(prefix) {
  let lastChar = prefix.slice(-1);
  let base = prefix.slice(0, -1);
  
  if (lastChar === 'Z') {
    return base ? incrementAlphaSequence(base) + 'A' : 'AA';
  } else {
    return base + String.fromCharCode(lastChar.charCodeAt(0) + 1);
  }
}

// Define the Patient schema
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
  notes:{
    type: String,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Pre-save hook to generate UHID before saving a patient document
patientSchema.pre('save', async function (next) {
  if (!this.uhid) {
    // Get the doctor's first letter
    const doctor = await mongoose.model('User').findById(this.doctor);
    const doctorInitial = doctor.name[0].toUpperCase(); // Get the first letter of the doctor's name

    // Find the last patient for this doctor to get the last UHID
    const lastPatient = await this.constructor.findOne({ uhid: { $regex: `^${doctorInitial}-` } }).sort({ uhid: -1 });

    let newUHID;
    if (lastPatient && lastPatient.uhid) {
      // Extract the alpha prefix and number from the last UHID
      const lastUHID = lastPatient.uhid;
      const [_, alphaPrefix, numberPart] = lastUHID.match(/^([A-Z]+)-([0-9]{4})$/);

      let number = parseInt(numberPart, 10) + 1;

      // Check if we need to reset the number and increment the alpha prefix
      if (number > 9999) {
        number = 1;
        newUHID = `${doctorInitial}-${incrementAlphaSequence(alphaPrefix)}0001`;
      } else {
        newUHID = `${doctorInitial}-${alphaPrefix}${String(number).padStart(4, '0')}`;
      }
    } else {
      // If no previous UHID exists for this doctor, start from 'A0001'
      newUHID = `${doctorInitial}-A0001`;
    }

    // Assign the new UHID to the patient
    this.uhid = newUHID;
  }
  next();
});

// Create the Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
