const Event = require('../models/Event');

class EventService {
  getAll = async (user) => {
    if (!user) return 401;
    const events = await Event.find({ user });
    return events;
  };

  getOne = async (id, user) => {
    if (!user) return 401;
    const event = await Event.findOne({ _id: id, user });
    if (!event) return 404;
    return event;
  };

  createOne = async (user, eventObj) => {
    if (!user) return 401;
    if (eventObj.startTime < new Date()) {
      return 400;
    }
    if (eventObj.startTime > eventObj.endTime) {
      return 400;
    }
    if (eventObj.reminderTime > eventObj.startTime) {
      return 400;
    }
    const event = await Event.create({ user, ...eventObj });
    return event;
  };

  updateOne = async (id, user, updatedObj) => {
    if (!user) return 401;
    const event = await Event.findOne({ _id: id, user });
    if (!event) 404;
    if ((updatedObj.startTime || event.startTime) < new Date()) {
      return 400;
    }
    if ((updatedObj.startTime || event.startTime) > (updatedObj.endTime || event.endTime)) {
      return 400;
    }
    if (updatedObj.reminderTime > (updatedObj.startTime || event.startTime)) {
      return 400;
    }
    const newEvent = await Event.findOneAndUpdate(
      { _id: id, user },
      { $set: updatedObj },
      { new: true }
    );
    return newEvent;
  };

  restoreOne = async (id, user) => {
    if (!user) return 401;
    const event = await Event.findOne({ _id: id, user });
    if (!event) 404;
    const newEvent = await Event.findOneAndUpdate(
      { _id: id, user },
      { $set: { isDeleted: false } },
      { new: true }
    );
    return newEvent;
  };

  deleteOne = async (id, user) => {
    if (!user) return 401;
    const event = await Event.findOne({ _id: id, user });
    if (!event) 404;
    const newEvent = await Event.findOneAndUpdate(
      { _id: id, user },
      { $set: { isDeleted: true } },
      { new: true }
    );
    return newEvent;
  };
}

module.exports = EventService;
