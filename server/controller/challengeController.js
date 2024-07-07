const { request } = require("express");
const Challenge=require("../models/Challenges")
const User=require("../models/User.Model");
const { sendMessage } = require("./messageController");
const { sendsms } = require("./sendsms");
const { checkout } = require("../routes/event.routes");


const getChallenge = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.status(200).json({challenges});
          
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error:error.message });
    }
}

const applyforChallenge = async (req, res) => {
    const userId = req.userId;
    const ChallengeId = req.params.ChallangeId; 
    try {

        console.log(userId,ChallengeId)
        // Validate input data
        if (!userId || !ChallengeId) {
            return res.status(400).json({ error: 'Invalid user ID or Challenge ID' });
        }

        const foundChallenge = await Challenge.findById(ChallengeId); 
        if (!foundChallenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if user is already registered for the challenge
        if (foundChallenge.participants.includes(userId)) {
            return res.status(200).json({ message: 'Already Registered' });
        }

        // Update challenge participants and user challenges
        foundChallenge.participants.push(userId);
        user.challenges.push(ChallengeId);
        user.points = user.calculatePoints();
        
        // Save changes
        await Promise.all([user.save(), foundChallenge.save()]);
        
        // Send confirmation message
        await sendsms(`You have successfully registered for the Event ${foundChallenge.name}`, `+91 ${user.phone}`);

        res.status(200).json({ message: 'Successfully applied for the event' });
    } catch (error) {
        console.error('Error applying for event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports = {getChallenge,applyforChallenge};