const express = require('express');
const EventController = require('../controllers/EventController');
const router = express.Router();

const eventController = new EventController();

router.get('/:user', eventController.getUserEvents);

router.get('/:id/:user', eventController.getUserEvent);

router.post('/:user', eventController.createEvent);

router.patch('/:id/:user', eventController.updateEvent);

router.delete('/:id/:user', eventController.deleteEvent);

router.patch('/:id/:user', eventController.restoreEvent);

module.exports = router;
