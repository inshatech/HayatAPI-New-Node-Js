const BedHistory = require("../models/bedHistoryModel");

const create = async (query) => {
  try {
    // Check if a bedHistory with the same name already exists
    const existingBedHistory = await BedHistory.findOne({ name: query.name });
    if (existingBedHistory) {
      return { success: false, message: 'Record is already exists' };
    }

    // Create a new bedHistory if no existing bedHistory is found
    const addBedHistory = new BedHistory(query);
    let response = await addBedHistory.save();
    response = response.toObject();
    return { success: true, message: 'Record created successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}


const findOne = async (query) => {
  try {
    const response = await BedHistory.findOne(query);
    if (!response) {
      return { success: false, message: 'Record not found' };
    }
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

const findAll = async (query) => {
  try {
    const response = await BedHistory.find(query);
    
    if (response.length === 0) {
      return { success: false, message: "No records found" };
    }
    
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


const findByIdAndDelete = async (query) => {
  try {
    const response = await BedHistory.findByIdAndDelete(query);
    if (!response) {
      return { success: false, message: 'Record not found or already deleted' };
    }
    return { success: true, message: 'Record deleted successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

const findOneAndUpdate = async (_id, query) => {
  try {
    const response = await BedHistory.findOneAndUpdate({ _id }, query, { new: true });
    if (!response) {
      return { success: false, message: 'Record not found' };
    }
    return { success: true, message: 'Record updated successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

const updateMany = async (where, query) => {
  try {
    const response = await BedHistory.updateMany(where, query);
    return { success: true, message: 'Records updated successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

module.exports = {
  create,
  findOne,
  findAll,
  findByIdAndDelete,
  findOneAndUpdate,
  updateMany
};
