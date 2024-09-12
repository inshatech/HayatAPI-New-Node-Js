const Patient = require("../models/patientModel");

const create = async (query) => {
  try {
    // Check if a bed with the same name already exists
    const existingPatient = await Patient.findOne({ mobile: query.mobile });
    if (existingPatient) {
      return { success: false, message: 'Mobile no is already exists' };
    }

    // Create a new bed if no existing bed is found
    const addPatient = new Patient(query);
    let response = await addPatient.save();
    response = response.toObject();
    return { success: true, message: 'Record created successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

const findOne = async (query) => {
  try {
    const response = await Patient.findOne(query);
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
    const response = await Patient.find(query);
    if (response.length === 0) {
      return { success: false, message: "Record not found" };
    }    
    return { 
      success: true, 
      data: response 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.message 
    };
  }
};

const findByIdAndDelete = async (query) => {
  try {
    const response = await Patient.findByIdAndDelete(query);
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
    const response = await Patient.findOneAndUpdate({ _id }, query, { new: true });
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
    const response = await Patient.updateMany(where, query);
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
}