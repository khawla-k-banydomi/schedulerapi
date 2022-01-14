const { NotFound } = require('http-errors');
const Event = require('../models/Event');

const getAll = async () => {
    const events = await Event.find({}).exec();
    if (!events) throw new NotFound(`No events found!`);
    return events;
}
const getOne = async (id) => {
    const event = await Event.findById(id).exec();
    if (!event) throw new NotFound(`No event found with id ${id} !`);
    return event;
}
const createOne = async (eventObj) => {
    const event = await Event.create(eventObj);
    return event;
}
const modifyOne = async (id, updatedObj) => {
    const event = await Event.findByIdAndUpdate(id, updatedObj)
    if (!event) throw new NotFound(`No event found with id ${id} !`);
    return event;
}
const deleteOne = async (id) => {
    const event=await Event.findByIdAndDelete(id)
    if (!event) throw new NotFound(`No event found with id ${id} !`);
}
const resetOne = async (id, updatedObj) => {
    const event = await Event.findByIdAndUpdate(id, updatedObj)
    if (!event) throw new NotFound(`No event found with id ${id} !`);
    return event;
}
module.exports={
    getAll,
    getOne,
    createOne,
    modifyOne,
    deleteOne,
    resetOne
}
