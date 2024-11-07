const patientService = require('../services/patientService');

const createPatientRecord = async (req, res) => {
  try {
    const query = req.body;
    const result = await patientService.create(query);
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const searchPatients = async (req, res) => {
  try {
    const { search } = req.query;
    const patients = await patientService.findAll({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { uhid: { $regex: search, $options: 'i' } },
      ],
    });

    res.json(patients);
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

const getPatientRecord = async (req, res) => {
  try {
    const query = req.params.id; // Assuming you use params to identify the patient record
    const result = await patientService.findOne({ _id: query });
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const getAllPatientRecords = async (req, res) => {
  try {
    const query = req.query; // Assuming query parameters for filtering
    const result = await patientService.findAll(query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const updatePatientRecord = async (req, res) => {
  try {
    const _id = req.params.id; // Assuming the ID is passed as a URL parameter
    const query = req.body;
    const result = await patientService.findOneAndUpdate(_id, query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const deletePatientRecord = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await patientService.findByIdAndDelete(_id);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const updateMultiplePatientRecords = async (req, res) => {
  try {
    const where = req.body.where; // The condition for selecting records
    const query = req.body.query; // The update data
    const result = await patientService.updateMany(where, query);
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
  createPatientRecord,
  getPatientRecord,
  getAllPatientRecords,
  updatePatientRecord,
  deletePatientRecord,
  updateMultiplePatientRecords,
  searchPatients
}
