const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

// @desc Get all events
// @route GET /api/events/getAllEvents)
// @access Public
router.get('/getAllEvents', eventController.getAllEvents);

// @desc Create a new event
// @route POST /api/events/createEvent
// @access Private
router.post('/createEvent', eventController.createEvent);

// @desc Get an event by id
// @route GET /api/events/getEventById
// @access Private
router.get('/getEventById', eventController.getEventById);

// @desc Update an event
// @route PUT /api/events/:id
// @access Private
router.put('/updateEvent', eventController.updateEvent);

// @desc Delete an event
// @route DELETE /api/events/:id
// @access Private
router.delete('/deleteEvent', eventController.deleteEvent);


// @route PUT /api/events/join
// @access Private
router.put('/join', eventController.joinEvent);


// @desc remove a member from an event 
// @route POST /api/events/unjoin
// @access Private
router.post('/unjoin', eventController.unjoinEvent);


// @desc checks if a member is registered in the event
// @route GET /api/events/checkMember
// @access Private
router.get('/checkMember', eventController.checkEventJoinMember);


// @desc count member registered in the event
// @route GET /api/events/countMembers
// @access Private
router.get('/countMembers', eventController.countMembers);

// @desc Gets all events where the user is registered for
// @route GET /api/events/myEvents
// @access Private
router.get('/myEvents', eventController.getMyEvents);

// @desc Gets all events where the user is the creator
// @route GET /api/events/myEvents
// @access Private
router.get('/createdEvents', eventController.getMyCreatedEvents);


module.exports = router;
