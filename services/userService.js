const User = require("../models/userModel");

export const create = async (query) => {
  try {
    const addUser = new User(query);
    let response = await addUser.save();
    response = response.toObject();
    delete response.password; // Ensure password is not returned
    return { success: true, message: 'User created successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export const findOne = async (query) => {
  try {
    const response = await User.findOne(query).select("-password");
    if (!response) {
      return { success: false, message: 'User not found' };
    }
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export const findAll = async (query) => {
  try {
    const response = await User.find(query).select("-password");
    
    if (!response.length) {
      return { success: false, message: "No records found" };
    }
    
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


export const findByIdAndDelete = async (query) => {
  try {
    const response = await User.findByIdAndDelete(query);
    if (!response) {
      return { success: false, message: 'User not found or already deleted' };
    }
    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export const findOneAndUpdate = async (_id, query) => {
  try {
    const response = await User.findOneAndUpdate({ _id }, query, { new: true }).select("-password");
    if (!response) {
      return { success: false, message: 'User not found' };
    }
    return { success: true, message: 'User updated successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export const updateMany = async (where, query) => {
  try {
    const response = await User.updateMany(where, query);
    return { success: true, message: 'Users updated successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}