const therapist = require("../models/therapist.model")

const getTherapists = async (req, res) => {
    try {
        const therapists = await therapist.find();
        res.json({therapists});
          
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error:error.message });
    }
}
module.exports = {getTherapists};