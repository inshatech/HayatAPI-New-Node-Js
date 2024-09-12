const fitnessService = require('../services/fitnessService');

const createFitnessRecord = async (req, res) => {
  try {
    const query = req.body;
    const result = await fitnessService.create(query);
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getFitnessRecord = async (req, res) => {
  try {
    const query = req.params.id; // Assuming you use params to identify the fitness record
    const result = await fitnessService.findOne({ _id: query });
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getAllFitnessRecords = async (req, res) => {
  try {
    const query = req.query; // Assuming query parameters for filtering
    const result = await fitnessService.findAll(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const updateFitnessRecord = async (req, res) => {
  try {
    const _id = req.params.id; // Assuming the ID is passed as a URL parameter
    const query = req.body;
    const result = await fitnessService.findOneAndUpdate(_id, query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const deleteFitnessRecord = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await fitnessService.findByIdAndDelete(_id);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const updateMultipleFitnessRecords = async (req, res) => {
  try {
    const where = req.body.where; // The condition for selecting records
    const query = req.body.query; // The update data
    const result = await fitnessService.updateMany(where, query);
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
  createFitnessRecord,
  getFitnessRecord,
  getAllFitnessRecords,
  updateFitnessRecord,
  deleteFitnessRecord,
  updateMultipleFitnessRecords
}
