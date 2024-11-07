const scalpService = require('../services/scalpService');
const patientService = require('../services/patientService');
const userService = require('../services/userService');

const createScalpRecord = async (req, res) => {
    try {
        const { doctor, mobile, name, age, sex, city, patient } = req.body;

        // Check if the selected doctor is valid
        const doctorResponse = await userService.findOne({ _id: doctor });
        const existingUser = doctorResponse?.data;

        if (!existingUser || existingUser.designation !== 'doctor') {
            return res.status(200).json({ success: false, message: 'Invalid doctor selected' });
        }

        // If patient is not provided, check if the patient is already registered
        if (!patient) {

            // Check if required fields are present
            if (!doctor || !mobile || !name || !age || !sex || !city) {
                return res.status(200).json({ success: false, message: 'Missing required fields' });
            }

            const patientResponse = await patientService.findOne({ mobile, doctor });
            const existingPatient = patientResponse?.data;

            if (existingPatient) {
                return res.status(200).json({ success: false, message: 'Patient is already registered with this doctor' });
            }

            // Register a new patient
            const newPatient = {
                name,
                mobile,
                age,
                sex,
                city,
                doctor
            };
            const patientCreationResponse = await patientService.create(newPatient);
            if (!patientCreationResponse.success) {
                return res.status(200).json({ success: false, message: 'Failed to register patient' });
            }

            req.body.patient = patientCreationResponse.data._id;
        }

        // Create new Scalp record
        const scalpResponse = await scalpService.create(req.body);
        if (scalpResponse.success) {
            return res.status(201).json(scalpResponse);
        } else {
            return res.status(200).json({ success: false, message: 'Failed to create Scalp record' });
        }

    } catch (error) {
        console.error(error);
        return res.status(200).json({ success: false, message: 'Internal server error' });
    }
};

const getScalpRecord = async (req, res) => {
    try {
        const query = req.params.id; // Assuming you use params to identify the scalp record
        const result = await scalpService.findOne({ _id: query });
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    } catch (error) {
        return res.status(200).json({ success: false, message: error.message });
    }
}

const getAllScalpRecords = async (req, res) => {
    try {
        let query = req.query; // Get query parameters for filtering
        const result = await scalpService.findAll(query); // Use the final query
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    } catch (error) {
        return res.status(200).json({ success: false, message: error.message });
    }
};


const updateScalpRecord = async (req, res) => {
    try {
        const _id = req.params.id; // Assuming the ID is passed as a URL parameter
        const query = req.body;
        const result = await scalpService.findOneAndUpdate(_id, query);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    } catch (error) {
        return res.status(200).json({ success: false, message: error.message });
    }
}

const deleteScalpRecord = async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await scalpService.findByIdAndDelete(_id);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    } catch (error) {
        return res.status(200).json({ success: false, message: error.message });
    }
}

const updateMultipleScalpRecords = async (req, res) => {
    try {
        const where = req.body.where; // The condition for selecting records
        const query = req.body.query; // The update data
        const result = await scalpService.updateMany(where, query);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(200).json({ success: false, message: error.message });
    }
}

module.exports = {
    createScalpRecord,
    getScalpRecord,
    getAllScalpRecords,
    updateScalpRecord,
    deleteScalpRecord,
    updateMultipleScalpRecords
}
