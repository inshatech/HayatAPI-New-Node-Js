const ipdService = require('../services/ipdService');
const patientService = require('../services/patientService');
const userService = require('../services/userService');
const bedService = require("../services/bedService");


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
      const patientCreationResponse = await patientService.create(newPatient);
      if (!patientCreationResponse.success) {
        return res.status(400).json({ success: false, message: 'Failed to register patient' });
      }

      req.body.patient = patientCreationResponse.data._id;
    }

    // Create new IPD record
    const ipdResponse = await ipdService.create(req.body);
    if (ipdResponse.success) {
      const bed_id = ipdResponse.data.bed;
      const bedQuery = { isOccupied: true };
      const setBedStatus = await bedService.findOneAndUpdate(bed_id, bedQuery);
      return res.status(201).json(ipdResponse);
    } else {
      return res.status(400).json({ success: false, message: 'Failed to create IPD record' });
    }

  } catch (error) {
    console.error(error);
    return res.status(404).json({ success: false, message: 'Internal server error' });
  }
};

const switchBed = async (req, res) => {
  try {
    const _id = req.params.id; // Assuming the ID is passed as a URL parameter
    const query = req.body;
    const checkBedByPatient = await ipdService.findOne({ bed: query.bed });
    let response;
    if (checkBedByPatient.success) {
      const task1 = await ipdService.findOneAndUpdate(checkBedByPatient.data._id, { bed: query.old_bed });
      const task2 = await ipdService.findOneAndUpdate(_id, { bed: query.bed });
      if (task1.success && task2.success) {
        response = { success: true, message: 'Bed switched successfully', data: [task1.data, task2.data] };
      } else {
        return res.status(400).json({ success: false, message: 'Failed to switch bed' });
      }
    } else {
      const task1 = await ipdService.findOneAndUpdate(_id, { bed: query.bed });
      const task2 = await bedService.findOneAndUpdate(query.bed, { isOccupied: true });
      const task3 = await bedService.findOneAndUpdate(query.old_bed, { isOccupied: false });
      if (task1.success && task2.success && task3.success) {
        response = { success: true, message: 'Bed switched successfully', data: task1.data };
      } else {
        return res.status(400).json({ success: false, message: 'Failed to switch bed' });
      }
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error)
    return res.status(404).json({ success: false, message: error.message });
  }
}
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
    return res.status(404).json({ success: false, message: error.message });
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
    return res.status(404).json({ success: false, message: error.message });
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
    return res.status(404).json({ success: false, message: error.message });
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
    return res.status(404).json({ success: false, message: error.message });
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
    return res.status(404).json({ success: false, message: error.message });
  }
}

module.exports = {
  createIPDRecord,
  getIPDRecord,
  getAllIPDRecords,
  updateIPDRecord,
  deleteIPDRecord,
  updateMultipleIPDRecords,
  switchBed
}
