process.env.NODE_ENV = 'test';

const { faker } = require('@faker-js/faker');
let Event = require('../src/models/Event');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let expect = chai.expect;

chai.use(chaiHttp);

let randomDate = faker.date.future(100);

describe('Events integration tests', () => {
  afterEach(async () => {
    await Event.deleteMany({});
  });

  it('GET user events', async function () {
    const username = 'username';
    const events = [
      {
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
    await Event.create(events);

    const res = await chai.request(app).get(`/event/${username}`);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Fetched successfully');
    expect(res.body.data.length).to.be.equals(2);
    expect(events.map((h) => h.name)).to.includes(res.body.data[0].name);
    expect(events.map((h) => h.name)).to.includes(res.body.data[1].name);
  });

  it('event id must be a valid mongodb id', async function () {
    const username = 'username';
    const event = {
      user: username,
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: true
    };
    await Event.create(event);

    const res = await chai.request(app).get(`/event/eventId/${username}`);

    expect(res.status).to.be.equals(400);
  });

  it('event must be exist', async function () {
    const username = 'username';
    const event = {
      user: username,
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: true
    };
    await Event.create(event);

    const otherEventId = '45cbc4a0e4123f6920000002';

    const res = await chai.request(app).get(`/event/${otherEventId}/${username}`);

    expect(res.status).to.be.equals(404);
  });

  it('GET single user event', async function () {
    const username = 'username';
    let event = {
      user: username,
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: true
    };
    event = await Event.create(event);

    const res = await chai.request(app).get(`/event/${event._id}/${username}`);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Fetched successfully');
    expect(res.body.data.name).to.be.equals(event.name);
  });

  it('Unauthenticated user can not create an event', async function () {
    const body = {
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: true
    };

    const res = await chai.request(app).post(`/event/null`).send(body);

    expect(res.status).to.be.equals(401);
  });

  it('CREATE an event', async function () {
    const username = 'username';

    const body = {
      user: username,
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: true
    };

    const res = await chai.request(app).post(`/event/${username}`).send(body);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Created successfully');
    expect(res.body.data.name).to.be.equals(body.name);
  });

  it('UPDATE an event', async function () {
    const username = 'username';

    const input = {
      user: username,
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: true
    };

    const event = await Event.create(input);

    const res = await chai
      .request(app)
      .patch(`/event/${event._id}/${username}`)
      .send({ name: 'updated' });

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Updated successfully');
    expect(res.body.data.name).to.be.equals('updated');
  });

  it('DELETE an event', async function () {
    const username = 'username';

    const input = {
      user: username,
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: false
    };

    const event = await Event.create(input);

    const res = await chai.request(app).delete(`/event/${event._id}/${username}`);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Deleted successfully');
    expect(res.body.data.isDeleted).to.be.equals(true);
  });

  it('RESTORE an event', async function () {
    const username = 'username';

    const input = {
      user: username,
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      startTime: new Date(randomDate.setMonth(3)),
      endTime: new Date(randomDate.setMonth(5)),
      reminderTime: new Date(randomDate.setMonth(2)),
      type: 'urgent',
      repeatEvery: 'day',
      isDeleted: true
    };

    const event = await Event.create(input);

    const res = await chai.request(app).patch(`/event/restore/${event._id}/${username}`);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Restored successfully');
    expect(res.body.data.isDeleted).to.be.equals(false);
  });
});
