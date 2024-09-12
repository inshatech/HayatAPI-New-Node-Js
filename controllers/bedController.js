const bedService = require("../services/bedService");

const createBedRecord = async (req, res) => {
  try {
    const query = req.body;
    const result = await bedService.create(query);
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getBedRecord = async (req, res) => {
  try {
    const query = req.params.id; // Assuming you use params to identify the bed record
    const result = await bedService.findOne({_id: query});
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getAllBedRecords = async (req, res) => {
  try {
    const query = req.query; // Assuming query parameters for filtering
    const result = await bedService.findAll(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const updateBedRecord = async (req, res) => {
  try {
    const _id = req.params.id; // Assuming the ID is passed as a URL parameter
    const query = req.body;
    console.log(_id, query);
    const result = await bedService.findOneAndUpdate(_id, query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const deleteBedRecord = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await bedService.findByIdAndDelete(_id);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const updateMultipleBedRecords = async (req, res) => {
  try {
    const where = req.body.where; // The condition for selecting records
    const query = req.body.query; // The update data
    const result = await bedService.updateMany(where, query);
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
  createBedRecord,
  getBedRecord,
  getAllBedRecords,
  updateBedRecord,
  deleteBedRecord,
  updateMultipleBedRecords
};
