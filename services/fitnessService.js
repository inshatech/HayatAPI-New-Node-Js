const Fitness = require("../models/fitnessModel");

const create = async (query) => {
  try {
    const addFitness = new Fitness(query)
    let response = await addFitness.save();
    response = await Fitness.findById(response._id).populate('patient')
      .populate({
        path: 'doctor',
        select: 'name',
      }).populate({
        'path': 'staff',
        select: 'name',
      });
    return { success: true, message: 'Record created successfully', data: response };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

const findOne = async (query) => {
  try {
    const response = await Fitness.findOne(query).populate('patient')
      .populate({
        path: 'doctor',
        select: 'name',
      }).populate({
        'path': 'staff',
        select: 'name',
      });
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
    let dateFilter = {};

    // Check for single date search
    if (query.singleDate) {
      const singleDate = new Date(query.singleDate);

      // Validate the single date
      if (isNaN(singleDate.getTime())) {
        return { success: false, message: "Invalid date format" };
      }

      // Adjust singleDate to the start and end of the day
      const startOfDay = new Date(singleDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(singleDate.setHours(23, 59, 59, 999));

      dateFilter.date = {
        $gte: startOfDay,
        $lte: endOfDay,
      };

      delete query.singleDate; // Remove the singleDate from the query
    }

    // Check for date range search
    if (query.startDate && query.endDate) {
      const startDate = new Date(query.startDate);
      const endDate = new Date(query.endDate);

      // Validate the start and end dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return { success: false, message: "Invalid date format" };
      }

      // Adjust endDate to the end of the day
      endDate.setHours(23, 59, 59, 999);

      dateFilter.date = {
        $gte: startDate,
        $lte: endDate,
      };

      delete query.startDate; // Remove the startDate from the query
      delete query.endDate;   // Remove the endDate from the query
    }

    const finalQuery = { ...query, ...dateFilter };
    const response = await Fitness.find(finalQuery)
      .populate('patient')
      .populate({
        path: 'doctor',
        select: 'name',
      })
      .populate({
        path: 'staff',
        select: 'name',
      });

    if (response.length === 0) {
      return { success: false, message: "Record not found" };
    }
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};


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
    const response = await Fitness.findOneAndUpdate({ _id }, query, { new: true }).populate('patient')
      .populate({
        path: 'doctor',
        select: 'name',
      }).populate({
        'path': 'staff',
        select: 'name',
      });
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
