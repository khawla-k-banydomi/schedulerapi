const EventService = require('../services/EventService');
const mongoIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

class EventController {
  eventService = new EventService();

  // As a user I can list my events, so that I can know their details
  getUserEvents = async (req, res) => {
    try {
      const user = req.params.user;

      if (!user || user === 'null') return res.sendStatus(401);

      const events = await this.eventService.getAll(user);
      if (!isNaN(events)) return res.sendStatus(events);

      return res.send({ data: events, message: 'Fetched successfully' });
    } catch (e) {
      return res.sendStatus(500);
    }
  };

  // As a user I can fetch a single event, so that I can know its details
  getUserEvent = async (req, res) => {
    try {
      const id = req.params.id,
        user = req.params.user;

      if (!mongoIdRegex.test(id)) return res.sendStatus(400);
      if (!user || user === 'null') return res.sendStatus(401);

      const event = await this.eventService.getOne(id, user);
      if (!isNaN(event)) return res.sendStatus(event);

      return res.send({ data: event, message: 'Fetched successfully' });
    } catch (e) {
      return res.sendStatus(500);
    }
  };

  // As a user I can create a new event, so that I can be notified with it
  createEvent = async (req, res) => {
    try {
      const user = req.params.user,
        eventObj = req.body;

      if (!user || user === 'null') return res.sendStatus(401);

      const event = await this.eventService.createOne(user, eventObj);
      if (!isNaN(event)) return res.sendStatus(event);

      res.send({ data: event, message: 'Created successfully' });
    } catch (e) {
      return res.sendStatus(500);
    }
  };

  // As a user I can list my events, so that I can manage them
  updateEvent = async (req, res) => {
    try {
      const id = req.params.id,
        user = req.params.user;

      if (!mongoIdRegex.test(id)) return res.sendStatus(400);
      if (!user || user === 'null') return res.sendStatus(401);

      const updatedObj = req.body;
      const event = await this.eventService.updateOne(id, user, updatedObj);
      if (!isNaN(event)) return res.sendStatus(event);

      res.send({ data: event, message: 'Updated successfully' });
    } catch (e) {
      return res.sendStatus(500);
    }
  };

  // As a user I can restore a deleted event, so that I can reschedule it
  restoreEvent = async (req, res) => {
    try {
      const id = req.params.id,
        user = req.params.user;

      if (!mongoIdRegex.test(id)) return res.sendStatus(400);
      if (!user || user === 'null') return res.sendStatus(401);

      const updatedObj = req.body;
      const event = await this.eventService.restoreOne(id, user, updatedObj);
      if (!isNaN(event)) return res.sendStatus(event);

      res.send({ data: event, message: 'Restored successfully' });
    } catch (e) {
      return res.sendStatus(500);
    }
  };

  // As a user I can delete events, so that I can manage them
  deleteEvent = async (req, res) => {
    try {
      const id = req.params.id,
        user = req.params.user;

      if (!mongoIdRegex.test(id)) return res.sendStatus(400);
      if (!user || user === 'null') return res.sendStatus(401);

      const event = await this.eventService.deleteOne(id, user);
      if (!isNaN(event)) return res.sendStatus(event);

      res.send({ data: event, message: 'Deleted successfully' });
    } catch (e) {
      return res.sendStatus(500);
    }
  };
}

module.exports = EventController;
