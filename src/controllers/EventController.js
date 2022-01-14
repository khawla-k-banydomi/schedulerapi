const { createOne, deleteOne, getAll, getOne, modifyOne, resetOne } = require("../services/EventService");

const getAllEvents = async (req, res, next) => {
    try {
        const events = await getAll();
        res.send({ data: events, message: `Successfully fetched all events!` });
    } catch (err) {
        next(err);
    }
}
const getOneEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const event = await getOne(id);
        res.send({ data: event, message: `Successfully fetched the event ${id}` });
    }
    catch (err) {
        next(err);
    }
}
const createEvent = async (req, res, next) => {
    try {
        const eventObj = req.body;
        const event = await createOne(eventObj);
        res.send({ data: event, message: `Successfully created event ${event._id} !` });
    } catch (err) {
        next(err)
    }
}
const modifyEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedObj = req.body;
        const event = await modifyOne(id, updatedObj);
        res.send({ data: event, message: `Successfully updated event ${event._id} !` });
    } catch (err) {
        next(err);
    }
}
const deleteEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteOne(id);
        res.send({ message: `Successfully deleted event!` });
    } catch (err) {
        next(err);
    }
}
const resetEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedObj = req.body;
        const event = await resetOne(id, updatedObj);
        res.send({ data: event, message: `Successfully updated event ${event._id} !` });
    } catch (err) {
        next(err);
    }
}
module.exports ={
    getAllEvents,
    getOneEvent,
    createEvent,
    modifyEvent,
    deleteEvent,
    resetEvent
}
