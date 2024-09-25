const ipdService = require('../services/ipdService');
const patientService = require('../services/patientService');
const userService = require('../services/userService');

const createIPDRecord = async (req, res) => {
  try {
    const { doctor, mobile, name, age, sex, city, patient } = req.body;

    // Check if the selected doctor is valid
    const doctorResponse = await userService.findOne({ _id: doctor });
    const existingUser = doctorResponse?.data;

    if (!existingUser || existingUser.designation !== 'doctor') {
      return res.status(400).json({ success: false, message: 'Invalid doctor selected' });
    }

    // If patient is not provided, check if the patient is already registered
    if (!patient) {

      // Check if required fields are present
      if (!doctor || !mobile || !name || !age || !sex || !city) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const patientResponse = await patientService.findOne({ mobile, doctor });
      const existingPatient = patientResponse?.data;

      if (existingPatient) {
        return res.status(400).json({ success: false, message: 'Patient is already registered with this doctor' });
      }

      // Register a new patient
      const newPatient = {
        name,
        mobile,
        age,
        sex,
        city,
        doctor
      };
      console.log(newPatient)
      const patientCreationResponse = await patientService.create(newPatient);
      if (!patientCreationResponse.success) {
        return res.status(400).json({ success: false, message: 'Failed to register patient' });
      }

      req.body.patient = patientCreationResponse.data._id;
    }

    // Create new IPD record
    const ipdResponse = await ipdService.create(req.body);
    if (ipdResponse.success) {
      return res.status(201).json(ipdResponse);
    } else {
      return res.status(400).json({ success: false, message: 'Failed to create IPD record' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


const getIPDRecord = async (req, res) => {
  try {
    const query = req.params.id; // Assuming you use params to identify the ipd record
    const result = await ipdService.findOne({ _id: query });
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getAllIPDRecords = async (req, res) => {
  try {
    const query = req.query; // Assuming query parameters for filtering
    const result = await ipdService.findAll(query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const updateIPDRecord = async (req, res) => {
  try {
    const _id = req.params.id; // Assuming the ID is passed as a URL parameter
    const query = req.body;
    const result = await ipdService.findOneAndUpdate(_id, query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const deleteIPDRecord = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await ipdService.findByIdAndDelete(_id);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const updateMultipleIPDRecords = async (req, res) => {
  try {
    const where = req.body.where; // The condition for selecting records
    const query = req.body.query; // The update data
    const result = await ipdService.updateMany(where, query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  createIPDRecord,
  getIPDRecord,
  getAllIPDRecords,
  updateIPDRecord,
  deleteIPDRecord,
  updateMultipleIPDRecords
}
