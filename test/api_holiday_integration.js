process.env.NODE_ENV = 'test';

const { faker } = require('@faker-js/faker');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
const Holiday = require('../src/models/Holiday');
let expect = chai.expect;

chai.use(chaiHttp);

let randomDate = faker.date.future(100);

describe('Holidays integration tests', () => {
  afterEach(async () => {
    await Holiday.deleteMany({});
  });

  it('GET user holidays', async function () {
    const username = 'username';
    const holidays = [
      {
        user: username,
        name: faker.name.firstName(),
        fixedWeekDay: 1
      },
      {
        user: username,
        name: faker.name.firstName(),
        timeStart: new Date(randomDate.setMonth(3)),
        timeEnd: new Date(randomDate.setMonth(5))
      }
    ];
    await Holiday.create(holidays);

    const res = await chai.request(app).get(`/holiday/${username}`);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Fetched successfully');
    expect(res.body.data.length).to.be.equals(2);
    expect(holidays.map((h) => h.name)).to.includes(res.body.data[0].name);
    expect(holidays.map((h) => h.name)).to.includes(res.body.data[1].name);
    expect(holidays.map((h) => h.fixedWeekDay)).to.be.not.undefined;
    expect(holidays.map((h) => h.timeStart)).to.to.be.not.undefined;
  });

  it('can not return missing holiday', async function () {
    const username = 'username';
    let holiday = {
      user: username,
      name: faker.name.firstName(),
      fixedWeekDay: 1
    };
    holiday = await Holiday.create(holiday);

    const otherHolidayId = '45cbc4a0e4123f6920000002';

    const res = await chai.request(app).get(`/holiday/${otherHolidayId}/${username}`);

    expect(res.status).to.be.equals(404);
  });

  it('holiday id must be a valid mongodb id', async function () {
    const username = 'username';
    let holiday = {
      user: username,
      name: faker.name.firstName(),
      fixedWeekDay: 1
    };
    holiday = await Holiday.create(holiday);

    const res = await chai.request(app).get(`/holiday/holidayId/${username}`);

    expect(res.status).to.be.equals(400);
  });

  it('GET single user holiday', async function () {
    const username = 'username';
    let holiday = {
      user: username,
      name: faker.name.firstName(),
      fixedWeekDay: 1
    };
    holiday = await Holiday.create(holiday);

    const res = await chai.request(app).get(`/holiday/${holiday._id}/${username}`);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Fetched successfully');
    expect(res.body.data.name).to.be.equals(holiday.name);
    expect(res.body.data.fixedWeekDay).to.be.equals(holiday.fixedWeekDay);
  });

  it('CREATE a ranged-days holiday', async function () {
    const username = 'username';

    const body = {
      user: username,
      name: faker.name.firstName(),
      timeStart: new Date(randomDate.setMonth(3)),
      timeEnd: new Date(randomDate.setMonth(5))
    };

    const res = await chai.request(app).post(`/holiday/range/${username}`).send(body);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Created successfully');
    expect(res.body.data.name).to.be.equals(body.name);
    expect(res.body.data.fixedWeekDay).to.be.undefined;
    expect(res.body.data.timeStart).to.be.not.undefined;
    expect(res.body.data.timeEnd).to.be.not.undefined;
  });

  it('CREATE a fixed-day holiday', async function () {
    const username = 'username';

    const body = {
      user: username,
      name: faker.name.firstName(),
      fixedWeekDay: 1
    };

    const res = await chai.request(app).post(`/holiday/fixed/${username}`).send(body);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Created successfully');
    expect(res.body.data.name).to.be.equals(body.name);
    expect(res.body.data.fixedWeekDay).to.be.equals(body.fixedWeekDay);
  });

  it('UPDATE a holiday', async function () {
    const username = 'username';

    const input = {
      user: username,
      name: faker.name.firstName(),
      fixedWeekDay: 1
    };

    const holiday = await Holiday.create(input);

    const res = await chai
      .request(app)
      .patch(`/holiday/${holiday._id}/${username}`)
      .send({ fixedWeekDay: 3 });

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Updated successfully');
    expect(res.body.data.fixedWeekDay).to.be.equals(3);
  });

  it('DELETE a holiday', async function () {
    const username = 'username';

    const input = {
      user: username,
      name: faker.name.firstName(),
      fixedWeekDay: 1
    };

    const holiday = await Holiday.create(input);

    const res = await chai.request(app).delete(`/holiday/${holiday._id}/${username}`);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Deleted successfully');
  });

  it('holiday must be exist', async function () {
    const username = 'username';

    const input = {
      user: username,
      name: faker.name.firstName(),
      fixedWeekDay: 1
    };

    const holiday = await Holiday.create(input);

    const otherHolidayId = '45cbc4a0e4123f6920000002';

    const res = await chai.request(app).delete(`/holiday/${otherHolidayId}/${username}`);

    expect(res.status).to.be.equals(404);
  });
});
