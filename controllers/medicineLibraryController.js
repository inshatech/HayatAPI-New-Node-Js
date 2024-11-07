const medicineLibraryService = require('../services/medicineLibraryService');

const createMedicineLibraryRecord = async (req, res) => {
  try {
    const query = req.body;
    const result = await medicineLibraryService.create(query);
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const getMedicineLibraryRecord = async (req, res) => {
  try {
    const query = req.params.id; // Assuming you use params to identify the medicineLibrary record
    const result = await medicineLibraryService.findOne({ _id: query });
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const getAllMedicineLibraryRecords = async (req, res) => {
  try {
    const query = req.query; // Assuming query parameters for filtering
    const result = await medicineLibraryService.findAll(query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const updateMedicineLibraryRecord = async (req, res) => {
  try {
    const _id = req.params.id; // Assuming the ID is passed as a URL parameter
    const query = req.body;
    const result = await medicineLibraryService.findOneAndUpdate(_id, query);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const deleteMedicineLibraryRecord = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await medicineLibraryService.findByIdAndDelete(_id);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

const updateMultipleMedicineLibraryRecords = async (req, res) => {
  try {
    const where = req.body.where; // The condition for selecting records
    const query = req.body.query; // The update data
    const result = await medicineLibraryService.updateMany(where, query);
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
  createMedicineLibraryRecord,
  getMedicineLibraryRecord,
  getAllMedicineLibraryRecords,
  updateMedicineLibraryRecord,
  deleteMedicineLibraryRecord,
  updateMultipleMedicineLibraryRecords
}
