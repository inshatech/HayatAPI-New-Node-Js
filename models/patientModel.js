const mongoose = require('mongoose');

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
  }
});

// Pre-save hook to generate UHID before saving a patient document
patientSchema.pre('save', async function (next) {
  if (!this.uhid) {
    // Find the last patient to get the last UHID
    const lastPatient = await this.constructor.findOne().sort({ uhid: -1 });

    let newUHID;
    if (lastPatient && lastPatient.uhid) {
      // Extract the prefix and number from the last UHID
      const lastUHID = lastPatient.uhid;
      const prefix = lastUHID.slice(0, 3); // e.g., 'ABC'
      let number = parseInt(lastUHID.slice(3), 10); // e.g., '0001' -> 1

      // Increment the number
      number++;

      // Check if we need to switch the prefix after reaching 9999
      if (number > 9999) {
        number = 1;
        const newPrefixCharCode = prefix.charCodeAt(0) + 1;
        newUHID = String.fromCharCode(newPrefixCharCode) + 'BC' + '0001';
      } else {
        newUHID = prefix + String(number).padStart(4, '0');
      }
    } else {
      // If no previous patient exists, start from 'ABC0001'
      newUHID = 'ABC0001';
    }

    // Assign the new UHID to the patient
    this.uhid = newUHID;
  }
  next();
});

// Create the Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
