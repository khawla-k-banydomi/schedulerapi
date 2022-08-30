const { NotFound, BadRequest, Unauthorized } = require('http-errors');
const Event = require('../models/Event');

class EventService {
  getAll = async (user) => {
    if (!user) throw new Unauthorized('Unauthorized');
    const events = await Event.find({ user });
    return events;
  };

  getOne = async (id, user) => {
    if (!user) throw new Unauthorized('Unauthorized');
    const event = await Event.findOne({ id, user });
    if (!event) throw new NotFound('Event does not exist');
    return event;
  };

  createOne = async (user, eventObj) => {
    if (!user) throw new Unauthorized('Unauthorized');
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
    if (!user) throw new Unauthorized('Unauthorized');
    const event = await Event.findOne({ id, user });
    if (!event) throw new NotFound('Event does not exist');
    if ((updatedObj.startTime || event.startTime) < new Date()) {
      throw new BadRequest('Start time must be in the future');
    }
    if ((updatedObj.startTime || event.startTime) > (updatedObj.endTime || event.endTime)) {
      throw new BadRequest('Start time must be before end time');
    }
    if (updatedObj.reminderTime > (updatedObj.startTime || event.startTime)) {
      throw new BadRequest('Reminder time must be prior start time');
    }
    const newEvent = await Event.findOneAndUpdate(
      { id, user },
      { $set: updatedObj },
      { new: true }
    );
    return newEvent;
  };

  restoreOne = async (id, user) => {
    if (!user) throw new Unauthorized('Unauthorized');
    const event = await Event.findOne({ id, user });
    if (!event) throw new NotFound('Event does not exist');
    const newEvent = await Event.findOneAndUpdate(
      { id, user },
      { $set: { isDeleted: false } },
      { new: true }
    );
    return newEvent;
  };

  deleteOne = async (id, user) => {
    if (!user) throw new Unauthorized('Unauthorized');
    const event = await Event.findOne({ id, user });
    if (!event) throw new NotFound('Event does not exist');
    const newEvent = await Event.findOneAndUpdate(
      { id, user },
      { $set: { isDeleted: true } },
      { new: true }
    );
    return newEvent;
  };
}

module.exports = EventService;
