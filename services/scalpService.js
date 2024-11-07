const Scalp = require("../models/scalpModel");

const create = async (query) => {
    try {
        const addScalp = new Scalp(query);
        let response = await addScalp.save();

        response = await Scalp.findById(response._id)
            .populate('patient')
            .populate({
                path: 'doctor',
                select: 'name',
            }).populate({
                'path': 'staff',
                select: 'name',
            });
        return { success: true, message: 'Record created successfully', data: response };
    } catch (error) {
        console.log(error)
        return { success: false, message: error.message };
    }
};


const findOne = async (query) => {
    try {
        const response = await Scalp.findOne(query)
            .populate('patient')
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

            dateFilter.doa = {
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

            dateFilter.doa = {
                ...(dateFilter.doa || {}), // Merge with existing dateFilter
                $gte: startDate,
                $lte: endDate,
            };

            delete query.startDate; // Remove the startDate from the query
            delete query.endDate;   // Remove the endDate from the query
        }

        const finalQuery = { ...query, ...dateFilter };
        const response = await Scalp.find(finalQuery)
            .populate('patient')
            .populate({
                path: 'doctor',
                select: 'name',
            }).populate({
                'path': 'staff',
                select: 'name',
            });
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
        const response = await Scalp.findByIdAndDelete(query);
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
        const response = await Scalp.findOneAndUpdate({ _id }, query, { new: true }).populate('patient')
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
        const response = await Scalp.updateMany(where, query).populate('patient')
            .populate({
                path: 'doctor',
                select: 'name',
            }).populate({
                'path': 'staff',
                select: 'name',
            });
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