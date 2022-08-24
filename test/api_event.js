process.env.NODE_ENV = 'test';

const { faker } = require('@faker-js/faker');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Event = require('../src/models/Event');
const EventService = require('../src/services/EventService');
const EventsController = require('../src/controllers/EventController');

let findByIdStub = sinon.stub(Event, 'findById'),
  findStub = sinon.stub(Event, 'find'),
  createStub = sinon.stub(Event, 'create'),
  findByIdAndUpdateStub = sinon.stub(Event, 'findByIdAndUpdate'),
  findByIdAndDeleteStub = sinon.stub(Event, 'findByIdAndDelete'),
  randomDate = faker.date.future(100);

describe('Events Service Tests', () => {
  describe('List Events', () => {
    it('return all events', async function () {
      const fakeEvents = [
        {
          _id: faker.database.mongodbObjectId(),
          userId: faker.database.mongodbObjectId(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeat: 2,
          restore: true
        },
        {
          _id: faker.database.mongodbObjectId(),
          userId: faker.database.mongodbObjectId(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'normal',
          repeat: 3,
          restore: false
        }
      ];

      findStub.returns(fakeEvents);
      const events = await EventService.getAll();

      expect(events).to.have.lengthOf(2);
      expect(events[0]._id).to.equal(fakeEvents[0]._id);
      expect(events[1]._id).to.equal(fakeEvents[1]._id);
      expect(events[0].name).to.equal(fakeEvents[0].name);
      expect(events[1].name).to.equal(fakeEvents[1].name);
      expect(events[0].type).to.equal('urgent');
      expect(events[1].type).to.equal('normal');
      expect(events[0].repeat).to.equal(2);
      expect(events[1].repeat).to.equal(3);
      expect(events[0].restore).to.equal(true);
      expect(events[1].restore).to.equal(false);
    });
  });

  describe('Single Event', () => {
    it('return an event by id', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        userId: faker.database.mongodbObjectId(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(3)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(2)),
        type: 'urgent',
        repeat: 2,
        restore: true
      };

      findByIdStub.returns(fakeEvent);
      const event = await EventService.getOne(fakeEvent._id);

      expect(event._id).to.equal(fakeEvent._id);
      expect(event.name).to.equal(fakeEvent.name);
      expect(event.type).to.equal('urgent');
      expect(event.restore).to.equal(true);
    });

    it('throw an not found error if id does not match', async function () {
      findByIdStub.returns(null);

      const id = faker.database.mongodbObjectId();

      let err;
      try {
        await EventService.getOne(id);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal(`No event found with id ${id} !`);
      expect(err.status).to.equal(404);
    });
  });

  describe('Create an Event', () => {
    it('create an event', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        userId: faker.database.mongodbObjectId(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(3)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(2)),
        type: 'urgent',
        repeat: 2,
        restore: true
      };

      createStub.returns(fakeEvent);
      const event = await EventService.createOne(fakeEvent);

      expect(event._id).to.equal(fakeEvent._id);
      expect(event.name).to.equal(fakeEvent.name);
      expect(event.type).to.equal('urgent');
      expect(event.restore).to.equal(true);
    });

    it('start time must be before end time', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        userId: faker.database.mongodbObjectId(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(8)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(3)),
        type: 'urgent',
        repeat: 2,
        restore: true
      };

      createStub.returns(fakeEvent);

      let err;
      try {
        await EventService.createOne(fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Start time must be before end time');
      expect(err.status).to.equal(400);
    });

    it('start time must be in the future', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        userId: faker.database.mongodbObjectId(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: faker.date.past(),
        endTime: new Date(randomDate.setMonth(7)),
        reminderTime: new Date(randomDate.setMonth(5)),
        type: 'urgent',
        repeat: 2,
        restore: true
      };

      createStub.returns(fakeEvent);

      let err;
      try {
        await EventService.createOne(fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Start time must be in the future');
      expect(err.status).to.equal(400);
    });

    it('reminder time must be prior start time', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        userId: faker.database.mongodbObjectId(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(4)),
        endTime: new Date(randomDate.setMonth(7)),
        reminderTime: new Date(randomDate.setMonth(5)),
        type: 'urgent',
        repeat: 2,
        restore: true
      };

      createStub.returns(fakeEvent);

      let err;
      try {
        await EventService.createOne(fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Reminder time must be prior start time');
      expect(err.status).to.equal(400);
    });
  });

  describe('Modify an Event', () => {
    it('modify an event', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: id,
          userId: faker.database.mongodbObjectId(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeat: 2,
          restore: true
        };

      findByIdAndUpdateStub.returns(fakeEvent);
      const event = await EventService.modifyOne(id, fakeEvent);

      expect(event._id).to.equal(id);
      expect(event.name).to.equal(fakeEvent.name);
      expect(event.type).to.equal('urgent');
      expect(event.restore).to.equal(true);
    });

    it('throw error if event does not exist', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: id,
          userId: faker.database.mongodbObjectId(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeat: 2,
          restore: true
        };

      findByIdAndUpdateStub.returns(null);

      let err;
      try {
        await EventService.modifyOne(id, fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal(`No event found with id ${id} !`);
      expect(err.status).to.equal(404);
    });

    it('start time must be before end time', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        userId: faker.database.mongodbObjectId(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(8)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(3)),
        type: 'urgent',
        repeat: 2,
        restore: true
      };

      findByIdAndUpdateStub.returns(fakeEvent);

      let err;
      try {
        await EventService.createOne(fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Start time must be before end time');
      expect(err.status).to.equal(400);
    });

    it('start time must be in the future', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        userId: faker.database.mongodbObjectId(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: faker.date.past(),
        endTime: new Date(randomDate.setMonth(7)),
        reminderTime: new Date(randomDate.setMonth(5)),
        type: 'urgent',
        repeat: 2,
        restore: true
      };

      findByIdAndUpdateStub.returns(fakeEvent);

      let err;
      try {
        await EventService.createOne(fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Start time must be in the future');
      expect(err.status).to.equal(400);
    });

    it('reminder time must be prior start time', async function () {
      const fakeEvent = {
        _id: faker.database.mongodbObjectId(),
        userId: faker.database.mongodbObjectId(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(4)),
        endTime: new Date(randomDate.setMonth(7)),
        reminderTime: new Date(randomDate.setMonth(5)),
        type: 'urgent',
        repeat: 2,
        restore: true
      };

      findByIdAndUpdateStub.returns(fakeEvent);

      let err;
      try {
        await EventService.createOne(fakeEvent);
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
          userId: faker.database.mongodbObjectId(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeat: 2,
          restore: true
        };

      findByIdAndDeleteStub.returns(fakeEvent);
      const event = await EventService.deleteOne(id, fakeEvent);

      expect(event).to.be.undefined;
    });

    it('throw error if event does not exist', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: id,
          userId: faker.database.mongodbObjectId(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeat: 2,
          restore: true
        };

      findByIdAndDeleteStub.returns(null);

      let err;
      try {
        await EventService.deleteOne(id, fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal(`No event found with id ${id} !`);
      expect(err.status).to.equal(404);
    });
  });

  describe('Reset an Event', () => {
    it('reset an event', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: id,
          userId: faker.database.mongodbObjectId(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeat: 2,
          restore: true
        };

      findByIdAndUpdateStub.returns(fakeEvent);
      const event = await EventService.resetOne(id, fakeEvent);

      expect(event._id).to.equal(id);
      expect(event.name).to.equal(fakeEvent.name);
      expect(event.type).to.equal('urgent');
      expect(event.restore).to.equal(true);
    });

    it('throw error if event does not exist', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeEvent = {
          _id: id,
          userId: faker.database.mongodbObjectId(),
          name: faker.name.firstName(),
          description: faker.lorem.paragraph(),
          startTime: new Date(randomDate.setMonth(3)),
          endTime: new Date(randomDate.setMonth(5)),
          reminderTime: new Date(randomDate.setMonth(2)),
          type: 'urgent',
          repeat: 2,
          restore: true
        };

      findByIdAndUpdateStub.returns(null);

      let err;
      try {
        await EventService.resetOne(id, fakeEvent);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal(`No event found with id ${id} !`);
      expect(err.status).to.equal(404);
    });
  });
});

describe('Events Controller Tests', () => {
  let req,
    res,
    id = faker.database.mongodbObjectId();

  beforeEach(() => {
    res = { send: function () {} };
  });

  it('return a list of events', async function () {
    const fakeEvents = [
      {
        _id: faker.database.mongodbObjectId(),
        userId: faker.database.mongodbObjectId(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(3)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(2)),
        type: 'urgent',
        repeat: 2,
        restore: true
      },
      {
        _id: faker.database.mongodbObjectId(),
        userId: faker.database.mongodbObjectId(),
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        startTime: new Date(randomDate.setMonth(3)),
        endTime: new Date(randomDate.setMonth(5)),
        reminderTime: new Date(randomDate.setMonth(2)),
        type: 'normal',
        repeat: 3,
        restore: false
      }
    ];

    req = {};
    findStub.returns(fakeEvents);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeEvents,
      message: 'Successfully fetched all events!'
    });
    await EventsController.getAllEvents(req, res);

    mock.verify();
  });

  it('return a single event by exact id', async function () {
    const fakeEvent = {
      _id: id,
      userId: faker.database.mongodbObjectId(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeat: 2,
      restore: true
    };

    req = { params: { id } };
    findByIdStub.returns(fakeEvent);
    const mock = sinon.mock(res);
    mock
      .expects('send')
      .once()
      .withExactArgs({
        data: fakeEvent,
        message: `Successfully fetched the event ${id}`
      });
    await EventsController.getOneEvent(req, res);

    mock.verify();
  });

  it('create a new event', async function () {
    const fakeEvent = {
      _id: id,
      userId: faker.database.mongodbObjectId(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeat: 2,
      restore: true
    };

    req = { body: fakeEvent };
    createStub.returns(fakeEvent);
    const mock = sinon.mock(res);
    mock
      .expects('send')
      .once()
      .withExactArgs({
        data: fakeEvent,
        message: `Successfully created event ${id} !`
      });
    await EventsController.createEvent(req, res);

    mock.verify();
  });

  it('modify an event', async function () {
    const fakeEvent = {
      _id: id,
      userId: faker.database.mongodbObjectId(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeat: 2,
      restore: true
    };

    req = { body: fakeEvent, params: { id } };
    findByIdAndUpdateStub.returns(fakeEvent);
    const mock = sinon.mock(res);
    mock
      .expects('send')
      .once()
      .withExactArgs({
        data: fakeEvent,
        message: `Successfully updated event ${id} !`
      });
    await EventsController.modifyEvent(req, res);

    mock.verify();
  });

  it('delete an event', async function () {
    const fakeEvent = {
      _id: id,
      userId: faker.database.mongodbObjectId(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeat: 2,
      restore: true
    };

    req = { params: { id } };
    findByIdAndDeleteStub.returns(fakeEvent);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({ message: 'Successfully deleted event!' });
    await EventsController.deleteEvent(req, res);

    mock.verify();
  });

  it('reset an event', async function () {
    const fakeEvent = {
      _id: id,
      userId: faker.database.mongodbObjectId(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeat: 2,
      restore: true
    };

    req = { params: { id }, body: fakeEvent };
    findByIdAndUpdateStub.returns(fakeEvent);
    const mock = sinon.mock(res);
    mock
      .expects('send')
      .once()
      .withExactArgs({
        data: fakeEvent,
        message: `Successfully updated event ${id} !`
      });
    await EventsController.resetEvent(req, res);

    mock.verify();
  });
});
