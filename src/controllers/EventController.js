const EventService = require('../services/EventService');

class EventController {
  eventService = new EventService();

  // As a user I can list my events, so that I can know their details
  getUserEvents = async (req, res) => {
    const user = req.params.user;
    const events = await this.eventService.getAll(user);
    return res.send({ data: events, message: 'Fetched successfully' });
  };

  // As a user I can fetch a single event, so that I can know its details
  getUserEvent = async (req, res) => {
    const id = req.params.id,
      user = req.params.user;
    const event = await this.eventService.getOne(id, user);
    return res.send({ data: event, message: 'Fetched successfully' });
  };

  // As a user I can create a new event, so that I can be notified with it
  createEvent = async (req, res) => {
    const user = req.params.user,
      eventObj = req.body;
    const event = await this.eventService.createOne(user, eventObj);
    res.send({ data: event, message: 'Created successfully' });
  };

  // As a user I can list my events, so that I can manage them
  updateEvent = async (req, res) => {
    const id = req.params.id,
      user = req.params.user;
    const updatedObj = req.body;
    const event = await this.eventService.updateOne(id, user, updatedObj);
    res.send({ data: event, message: 'Updated successfully' });
  };

  // As a user I can restore a deleted event, so that I can reschedule it
  restoreEvent = async (req, res) => {
    const id = req.params.id,
      user = req.params.user;
    const updatedObj = req.body;
    const event = await this.eventService.resetOne(id, user, updatedObj);
    res.send({ data: event, message: 'Restored successfully' });
  };

  // As a user I can delete events, so that I can manage them
  deleteEvent = async (req, res) => {
    const id = req.params.id,
      user = req.params.user;
    await this.eventService.deleteOne(id, user);
    res.send({ message: 'Deleted successfully' });
  };
}

module.exports = EventController;
