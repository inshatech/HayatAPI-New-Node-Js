const Bed = require("../models/bedModel");

const create = async (query) => {
  try {
    // Check if a bed with the same name already exists
    const existingBed = await Bed.findOne({ name: query.name });
    if (existingBed) {
      return { success: false, message: 'Record is already exists' };
    }

    // Create a new bed if no existing bed is found
    const addBed = new Bed(query);
    let response = await addBed.save();
    response = response.toObject();
    return { success: true, message: 'Bed created successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}


const findOne = async (query) => {
  try {
    const response = await Bed.findOne(query);
    if (!response) {
      return { success: false, message: 'Bed not found' };
    }
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

const findAll = async (query) => {
  try {
    const response = await Bed.find(query);
    
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
    const response = await Bed.findByIdAndDelete(query);
    if (!response) {
      return { success: false, message: 'Bed not found or already deleted' };
    }
    return { success: true, message: 'Bed deleted successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

const findOneAndUpdate = async (_id, query) => {
  try {
    const response = await Bed.findOneAndUpdate({ _id }, query, { new: true });
    if (!response) {
      return { success: false, message: 'Bed not found' };
    }
    return { success: true, message: 'Bed updated successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

const updateMany = async (where, query) => {
  try {
    const response = await Bed.updateMany(where, query);
    return { success: true, message: 'Beds updated successfully', data: response };
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
