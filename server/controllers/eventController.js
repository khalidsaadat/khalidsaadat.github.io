// events controller
// Author: Jonathan Haddad
// Date created: Mar 16, 2023

/* Description: This file contains the methods for handling the various event related HTTP requests.
 These include getting all events, creating a new event, getting a specific event by ID, updating an event, and deleting an event.*/

const Event = require('../models/eventModel');
const asyncHandler = require('express-async-handler');

// Get all events
const getAllEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new event
const createEvent = asyncHandler(async (req, res) => {
  try {
    const { name, description, date, location, creator } = req.body;
    const newEvent = await Event.create({ name, description, date, location, creator});
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific event by id
const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const event = await Event.findById(id);
  if (event) {
    res.json(event);
  } else {
    res.status(401);
    throw new Error("Event not found");
  }
});

// Update an event
const updateEvent = asyncHandler(async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an event
const deleteEvent = asyncHandler(async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add member to event
const joinEvent = asyncHandler(async (req, res) => {
  try {
    const { eventId, memberId } = req.body;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.members.includes(memberId)) {
      return res.status(400).json({ message: 'Member already added to the event' });
    }

    event.members.push(memberId);
    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// remove member from event
const unjoinEvent = asyncHandler(async (req, res) => {
  try {
    const { eventId, memberId } = req.body;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!event.members.includes(memberId)) {
      return res.status(400).json({ message: 'Member not found in the event' });
    }

    event.members = event.members.filter(member => member.toString() !== memberId);
    const updatedEvent = await event.save();

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Check if member is already registered 
const checkEventJoinMember = asyncHandler(async (req, res) => {
  try {
    const { eventId, memberId } = req.query;
    const event = await Event.findById(eventId);

    if (event.members.includes(memberId)) {
      res.status(200).json({ message: 'true' });
    }
    else {
      res.status(200).json({ message: 'false' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Counting the number of members in this event
const countMembers = asyncHandler(async (req, res) => {
  try {
    const { eventId } = req.query;
    const event = await Event.findById(eventId);

    if(event) {
      var cc = event.members;
      return res.status(200).json({ members: cc });
    }
    else {
      return res.status(400).json({ members: '0' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  } 
})

// All all events where the user is registered for
const getMyEvents = asyncHandler(async (req, res) => {
  try {
    const { memberId } = req.query;
    // const group = await Group.findById(groupId);  
  
    const event = await Event.find().where('members').in(memberId).exec();
  
    res.status(200).json(event);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// All all events where the user is registered for
const getMyCreatedEvents = asyncHandler(async (req, res) => {
  try {
    const { memberId } = req.query;
    // const group = await Group.findById(groupId);  
  
    const event = await Event.find().where('creator').in(memberId).exec();
  
    res.status(200).json(event);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  unjoinEvent,
  checkEventJoinMember,
  countMembers,
  getMyEvents,
  getMyCreatedEvents,
};
