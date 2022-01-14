var express = require('express');

const { getAllEvents, getOneEvent, createEvent, modifyEvent, deleteEvent, resetEvent } = require('../controllers/EventController');
var router = express.Router();

// get all events
router.get('/', getAllEvents);

// get one event
router.get('/:id', getOneEvent);

// create a new event
router.post('/', createEvent);

// modify an event
router.patch('/:id', modifyEvent);

// delete an event
router.delete('/:id', deleteEvent);

// reset an event
router.patch('/:id', resetEvent);


module.exports = router;
