const Billing = require("../models/billingModel");

const create = async (query) => {
  try {
    const addBilling = new Billing(query);
    let response = await addBilling.save();
    response = await Billing.findById(response._id).populate('patient');
    return { success: true, message: 'Record created successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


const findOne = async (query) => {
  try {
    const response = await Billing.findOne(query).populate('patient');
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
    const response = await Billing.find(query).populate('patient');
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
    const response = await Billing.findByIdAndDelete(query);
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
    const response = await Billing.findOneAndUpdate({ _id }, query, { new: true });
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
    const response = await Billing.updateMany(where, query);
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