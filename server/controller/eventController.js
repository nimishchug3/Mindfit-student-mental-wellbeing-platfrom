const { request } = require("express");
const event = require("../models/event.model");
const User=require("../models/User.Model");
const { sendMessage } = require("./messageController");
const { sendsms } = require("./sendsms");


const getevent = async (req, res) => {
    try {
        const events = await event.find();
        res.status(200).json({events});
          
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error:error.message });
    }
}
const applyforevent = async (req, res) => {
    const userId = req.userId;
    const eventId = req.params.eventId; 
    try {
        const foundEvent = await event.findById(eventId); 
        const user = await User.findById(userId);
        if (!foundEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        
        if (!foundEvent.participants) {
            foundEvent.participants = [];
        }
        if (foundEvent.participants.includes(userId)) {
            return res.status(200).json({ message: 'Already Registered' });
        }

        foundEvent.participants.push(userId);
        user.events.push(eventId);
        user.points=user.calculatePoints();
        await user.save();
          await foundEvent.save();
          await sendsms(`You have sucessfully registered for  the Event ${foundEvent.name}`,`+91 ${user.phone}`)

        res.status(200).json({ message: 'Successfully applied for the event' });
    } catch (error) {
        console.error('Error applying for event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAppliedEvent = async (req, res) => {
    try {
        const userId = req.userId;

        const eventsForUser = await event.find({ participants: userId })
        
        res.status(200).json({ events: eventsForUser});
    } catch (error) {
        console.log(error);
        return;
    }
}


module.exports = {getevent,applyforevent, getAppliedEvent};