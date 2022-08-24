const { NotFound, BadRequest } = require('http-errors');
const Event = require('../models/Event');

class EventService {
  getAll = async (user) => {
    const events = await Event.find({ user });
    return events;
  };

  getOne = async (id, user) => {
    const event = await Event.findOne({ id, user });
    if (!event) throw new NotFound('Event does not exist');
    return event;
  };

  createOne = async (user, eventObj) => {
    if (eventObj.startTime < new Date()) {
      throw new BadRequest('Start time must be in the future');
    }
    if (eventObj.startTime > eventObj.endTime) {
      throw new BadRequest('Start time must be before end time');
    }
    if (eventObj.reminderTime > eventObj.startTime) {
      throw new BadRequest('Reminder time must be prior start time');
    }
    const event = await Event.create({ user, ...eventObj });
    return event;
  };

  updateOne = async (id, user, updatedObj) => {
    if (updatedObj.startTime < new Date()) {
      throw new BadRequest('Start time must be in the future');
    }
    if (updatedObj.startTime > updatedObj.endTime) {
      throw new BadRequest('Start time must be before end time');
    }
    if (updatedObj.reminderTime > updatedObj.startTime) {
      throw new BadRequest('Reminder time must be prior start time');
    }
    const event = await Event.updateOne({ id, user }, { $set: updatedObj });
    if (!event) throw new NotFound('Event does not exist');
    return event;
  };

  restoreOne = async (id, user, updatedObj) => {
    const event = await Event.findByIdAndUpdate({ id, user }, { $set: updatedObj });
    if (!event) throw new NotFound('Event does not exist');
    return event;
  };

  deleteOne = async (id, user) => {
    const event = await Event.deleteOne({ id, user });
    if (!event) throw new NotFound('Event does not exist');
  };
}

module.exports = EventService;
