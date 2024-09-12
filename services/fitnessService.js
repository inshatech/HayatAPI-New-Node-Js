const Fitness = require("../models/fitnessModel");

const create = async (query) => {
  try {
    const addFitness = new Fitness(query);
    let response = await addFitness.save();
    response = response.toObject();
    return { success: true, message: 'Record created successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

const findOne = async (query) => {
  try {
    const response = await Fitness.findOne(query);
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
    const response = await Fitness.find(query);
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
}

const findByIdAndDelete = async (query) => {
  try {
    const response = await Fitness.findByIdAndDelete(query);
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
    const response = await Fitness.findOneAndUpdate({ _id }, query, { new: true });
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
    const response = await Fitness.updateMany(where, query);
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
