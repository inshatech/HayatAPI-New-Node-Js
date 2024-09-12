const dischargeService = require('../services/dischargeService');

const createDischargeRecord = async (req, res) => {
  try {
    const query = req.body;
    const result = await dischargeService.create(query);
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getDischargeRecord = async (req, res) => {
  try {
    const query = req.params.id; // Assuming you use params to identify the discharge record
    const result = await dischargeService.findOne({ _id: query });
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getAllDischargeRecords = async (req, res) => {
  try {
    const query = req.query; // Assuming query parameters for filtering
    const result = await dischargeService.findAll(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const updateDischargeRecord = async (req, res) => {
  try {
    const _id = req.params.id; // Assuming the ID is passed as a URL parameter
    const query = req.body;
    const result = await dischargeService.findOneAndUpdate(_id, query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const deleteDischargeRecord = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await dischargeService.findByIdAndDelete(_id);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const updateMultipleDischargeRecords = async (req, res) => {
  try {
    const where = req.body.where; // The condition for selecting records
    const query = req.body.query; // The update data
    const result = await dischargeService.updateMany(where, query);
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
  createDischargeRecord,
  getDischargeRecord,
  getAllDischargeRecords,
  updateDischargeRecord,
  deleteDischargeRecord,
  updateMultipleDischargeRecords
}
