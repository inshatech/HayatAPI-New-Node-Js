const MedicineLibrary = require("../models/medicineLibraryModel");
const User = require("../models/userModel");

const create = async (query) => {
  try {
    // Check if a User with the same name already exists
    const existingUser = await User.findOne({ _id: query.doctor });
    if (!existingUser.designation === 'doctor') {
      return { success: false, message: `Access permission denied!` };
    }

    // Check if a medicineLibrary with the same name already exists
    const existingMedicineLibrary = await MedicineLibrary.findOne({ name: query.name, doctor: query.doctor });
    if (existingMedicineLibrary) {
      return { success: false, message: 'Record is already exists' };
    }

    // Create a new medicineLibrary if no existing medicine Library is found
    const addMedicineLibrary = new MedicineLibrary(query);
    let response = await addMedicineLibrary.save();
    response = response.toObject();
    return { success: true, message: 'Record created successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}


const findOne = async (query) => {
  try {
    const response = await MedicineLibrary.findOne(query);
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
    const response = await MedicineLibrary.find(query);
    
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
    const response = await MedicineLibrary.findByIdAndDelete(query);
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
    const response = await MedicineLibrary.findOneAndUpdate({ _id }, query, { new: true });
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
    const response = await MedicineLibrary.updateMany(where, query);
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
