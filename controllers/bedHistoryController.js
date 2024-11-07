const bedHistoryService = require("../services/bedHistoryService");

const createBedHistoryRecord = async (req, res) => {
  try {
    const query = req.body;
    const result = await bedHistoryService.create(query);
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const getBedHistoryRecord = async (req, res) => {
  try {
    const query = req.params.id; // Assuming you use params to identify the bedHistory record
    const result = await bedHistoryService.findOne({_id: query});
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const getAllBedHistoryRecords = async (req, res) => {
  try {
    const query = req.query; // Assuming query parameters for filtering
    const result = await bedHistoryService.findAll(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const updateBedHistoryRecord = async (req, res) => {
  try {
    const _id = req.params.id; // Assuming the ID is passed as a URL parameter
    const query = req.body;
    console.log(_id, query);
    const result = await bedHistoryService.findOneAndUpdate(_id, query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const deleteBedHistoryRecord = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await bedHistoryService.findByIdAndDelete(_id);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const updateMultipleBedHistoryRecords = async (req, res) => {
  try {
    const where = req.body.where; // The condition for selecting records
    const query = req.body.query; // The update data
    const result = await bedHistoryService.updateMany(where, query);
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
  createBedHistoryRecord,
  getBedHistoryRecord,
  getAllBedHistoryRecords,
  updateBedHistoryRecord,
  deleteBedHistoryRecord,
  updateMultipleBedHistoryRecords
};
