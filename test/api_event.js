process.env.NODE_ENV = 'test';

const { faker } = require('@faker-js/faker');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Event = require('../src/models/Event');
const EventService = require('../src/services/EventService');
const EventController = require('../src/controllers/EventController');

let findOneStub = sinon.stub(Event, 'findOne'),
  findStub = sinon.stub(Event, 'find'),
  createStub = sinon.stub(Event, 'create'),
  findOneAndUpdateStub = sinon.stub(Event, 'findOneAndUpdate'),
  randomDate = faker.date.future(100);

describe('Events Service Tests', () => {
  const eventService = new EventService(),
    username = faker.name.fullName();

  describe('List Events', () => {
    it('return all events', async function () {
      const fakeEvents = [
        {
          _id: faker.database.mongodbObjectId(),
          user: username,
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeatEvery: 'day',
          isDeleted: true
        },
        {
          _id: faker.database.mongodbObjectId(),
          user: username,
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'normal',
          repeatEvery: 'month',
          isDeleted: false
        }
      ];

      findStub.returns(fakeEvents);
      const events = await eventService.getAll(username);

      expect(events).to.have.lengthOf(2);
      expect(events[0]._id).to.equal(fakeEvents[0]._id);
      expect(events[1]._id).to.equal(fakeEvents[1]._id);
      expect(events[0].name).to.equal(fakeEvents[0].name);
      expect(events[1].name).to.equal(fakeEvents[1].name);
      expect(events[0].type).to.equal('urgent');
      expect(events[1].type).to.equal('normal');
      expect(events[0].repeatEvery).to.equal('day');
      expect(events[1].repeatEvery).to.equal('month');
      expect(events[0].isDeleted).to.equal(true);
      expect(events[1].isDeleted).to.equal(false);
    });
  });

  describe('Single Event', () => {
    it('return an event by id', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        user: faker.name.fullName(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(3)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(2)),
        type: 'urgent',
        repeatEvery: 'day',
        isDeleted: false
      };

      findOneStub.returns(fakeEvent);
      const event = await eventService.getOne(fakeEvent._id, username);

      expect(event._id).to.equal(fakeEvent._id);
      expect(event.name).to.equal(fakeEvent.name);
      expect(event.type).to.equal('urgent');
      expect(event.isDeleted).to.equal(false);
    });

    it('throw an not found error if id does not match', async function () {
      findOneStub.returns(null);

      const id = faker.database.mongodbObjectId();

      let err;
      try {
        await eventService.getOne(id, username);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Event does not exist');
      expect(err.status).to.equal(404);
    });
  });

  describe('Create an Event', () => {
    it('create an event', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        user: faker.name.fullName(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(3)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(2)),
        type: 'urgent',
        repeatEvery: 'day',
        isDeleted: false
      };

      createStub.returns(fakeEvent);
      const event = await eventService.createOne(username, fakeEvent);

      expect(event._id).to.equal(fakeEvent._id);
      expect(event.name).to.equal(fakeEvent.name);
      expect(event.type).to.equal('urgent');
      expect(event.isDeleted).to.equal(false);
    });

    it('not authenticated user can not create a new event', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        user: faker.name.fullName(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(3)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(2)),
        type: 'urgent',
        repeatEvery: 'day',
        isDeleted: false
      };

      let err;
      try {
        await eventService.createOne(null, fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Unauthorized');
      expect(err.status).to.equal(401);
    });

    it('start time must be before end time', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        user: faker.name.fullName(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(8)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(3)),
        type: 'urgent',
        repeatEvery: 'day',
        isDeleted: false
      };

      createStub.returns(fakeEvent);

      let err;
      try {
        await eventService.createOne(username, fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Start time must be before end time');
      expect(err.status).to.equal(400);
    });

    it('start time must be in the future', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        user: faker.name.fullName(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: faker.date.past(),
        endTime: new Date(randomDate.setMonth(7)),
        reminderTime: new Date(randomDate.setMonth(5)),
        type: 'urgent',
        repeatEvery: 'day',
        isDeleted: false
      };

      createStub.returns(fakeEvent);

      let err;
      try {
        await eventService.createOne(username, fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Start time must be in the future');
      expect(err.status).to.equal(400);
    });

    it('reminder time must be prior start time', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        user: faker.name.fullName(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(4)),
        endTime: new Date(randomDate.setMonth(7)),
        reminderTime: new Date(randomDate.setMonth(5)),
        type: 'urgent',
        repeatEvery: 'day',
        isDeleted: false
      };

      createStub.returns(fakeEvent);

      let err;
      try {
        await eventService.createOne(username, fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Reminder time must be prior start time');
      expect(err.status).to.equal(400);
    });
  });

  describe('Update an Event', () => {
    it('update an event', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: id,
          user: faker.name.fullName(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeatEvery: 'day',
          isDeleted: false
        };

      findOneStub.returns(fakeEvent);
      findOneAndUpdateStub.returns(fakeEvent);
      const event = await eventService.updateOne(id, username, fakeEvent);

      expect(event._id).to.equal(id);
      expect(event.name).to.equal(fakeEvent.name);
      expect(event.type).to.equal('urgent');
      expect(event.isDeleted).to.equal(false);
    });

    it('throw error if event does not exist', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: id,
          user: faker.name.fullName(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeatEvery: 'day',
          isDeleted: false
        };

      findOneStub.returns(null);

      let err;
      try {
        await eventService.updateOne(id, username, fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Event does not exist');
      expect(err.status).to.equal(404);
    });

    it('start time must be before end time', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: faker.database.mongodbObjectId(),
          user: faker.name.fullName(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(8)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(3)),
          type: 'urgent',
          repeatEvery: 'day',
          isDeleted: false
        };

      findOneStub.returns(fakeEvent);
      findOneAndUpdateStub.returns(fakeEvent);

      let err;
      try {
        await eventService.updateOne(id, username, fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Start time must be before end time');
      expect(err.status).to.equal(400);
    });

    it('start time must be in the future', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: faker.database.mongodbObjectId(),
          user: faker.name.fullName(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: faker.date.past(),
          endTime: new Date(randomDate.setMonth(7)),
          reminderTime: new Date(randomDate.setMonth(5)),
          type: 'urgent',
          repeatEvery: 'day',
          isDeleted: false
        };

      findOneStub.returns(fakeEvent);
      findOneAndUpdateStub.returns(fakeEvent);

      let err;
      try {
        await eventService.updateOne(id, username, fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Start time must be in the future');
      expect(err.status).to.equal(400);
    });

    it('reminder time must be prior start time', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: faker.database.mongodbObjectId(),
          user: faker.name.fullName(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(4)),
          endTime: new Date(randomDate.setMonth(7)),
          reminderTime: new Date(randomDate.setMonth(5)),
          type: 'urgent',
          repeatEvery: 'day',
          isDeleted: false
        };

      findOneStub.returns(fakeEvent);
      findOneAndUpdateStub.returns(fakeEvent);

      let err;
      try {
        await eventService.updateOne(id, username, fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Reminder time must be prior start time');
      expect(err.status).to.equal(400);
    });
  });

  describe('Delete an Event', () => {
    it('delete an event', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: id,
          user: faker.name.fullName(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeatEvery: 'day',
          isDeleted: false
        };

      findOneStub.returns(fakeEvent);
      findOneAndUpdateStub.returns({ ...fakeEvent, isDeleted: true });
      const event = await eventService.deleteOne(id, username);

      expect(event._id).to.equal(id);
      expect(event.isDeleted).to.equal(true);
    });

    it('throw error if event does not exist', async function () {
      const id = faker.database.mongodbObjectId();

      findOneStub.returns(null);

      let err;
      try {
        await eventService.deleteOne(id, username);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Event does not exist');
      expect(err.status).to.equal(404);
    });
  });

  describe('Restore an Event', () => {
    it('restore an event', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: id,
          user: faker.name.fullName(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeatEvery: 'day',
          isDeleted: true
        };

      findOneStub.returns(fakeEvent);
      findOneAndUpdateStub.returns({ ...fakeEvent, isDeleted: false });
      const event = await eventService.restoreOne(id, username);

      expect(event._id).to.equal(id);
      expect(event.name).to.equal(fakeEvent.name);
      expect(event.type).to.equal('urgent');
      expect(event.isDeleted).to.equal(false);
    });

    it('throw error if event does not exist', async function () {
      const id = faker.database.mongodbObjectId();

      findOneStub.returns(null);

      let err;
      try {
        await eventService.restoreOne(id, username);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Event does not exist');
      expect(err.status).to.equal(404);
    });
  });
});

describe('Events Controller Tests', () => {
  let req,
    res,
    id = faker.database.mongodbObjectId(),
    username = faker.name.fullName(),
    eventController = new EventController();

  beforeEach(() => {
    res = { send: function () {} };
  });

  it('return a list of events', async function () {
    const fakeEvents = [
      {
        _id: faker.database.mongodbObjectId(),
        user: faker.name.fullName(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(3)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(2)),
        type: 'urgent',
        repeatEvery: 'day',
        isDeleted: false
      },
      {
        _id: faker.database.mongodbObjectId(),
        user: faker.name.fullName(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(3)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(2)),
        type: 'normal',
        repeatEvery: 'day',
        isDeleted: true
      }
    ];

    req = { params: { user: username } };
    findStub.returns(fakeEvents);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeEvents,
      message: 'Fetched successfully'
    });
    await eventController.getUserEvents(req, res);

    mock.verify();
  });

  it('return a single event by exact id', async function () {
    const fakeEvent = {
      _id: id,
      user: faker.name.fullName(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: false
    };

    req = { params: { user: username, id } };
    findOneStub.returns(fakeEvent);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeEvent,
      message: 'Fetched successfully'
    });
    await eventController.getUserEvent(req, res);

    mock.verify();
  });

  it('create a new event', async function () {
    const fakeEvent = {
      _id: id,
      user: faker.name.fullName(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: false
    };

    req = { body: fakeEvent, params: { user: username } };
    createStub.returns(fakeEvent);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeEvent,
      message: 'Created successfully'
    });
    await eventController.createEvent(req, res);

    mock.verify();
  });

  it('update an event', async function () {
    const fakeEvent = {
      _id: id,
      user: faker.name.fullName(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: false
    };

    req = { body: fakeEvent, params: { id, user: username } };
    findOneStub.returns(fakeEvent);
    findOneAndUpdateStub.returns(fakeEvent);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeEvent,
      message: 'Updated successfully'
    });
    await eventController.updateEvent(req, res);

    mock.verify();
  });

  it('delete an event', async function () {
    const fakeEvent = {
      _id: id,
      user: faker.name.fullName(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: false
    };

    req = { params: { id, user: username } };
    findOneStub.returns(fakeEvent);
    findOneAndUpdateStub.returns(fakeEvent);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({ data: fakeEvent, message: 'Deleted successfully' });
    await eventController.deleteEvent(req, res);

    mock.verify();
  });

  it('reset an event', async function () {
    const fakeEvent = {
      _id: id,
      user: faker.name.fullName(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: false
    };

    req = { params: { id, user: username }, body: fakeEvent };
    findOneStub.returns(fakeEvent);
    findOneAndUpdateStub.returns(fakeEvent);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeEvent,
      message: 'Restored successfully'
    });
    await eventController.restoreEvent(req, res);

    mock.verify();
  });
});
