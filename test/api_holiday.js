process.env.NODE_ENV = 'test';

const { faker } = require('@faker-js/faker');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Holiday = require('../src/models/Holiday');
const HolidayService = require('../src/services/HolidayService');
const HolidayController = require('../src/controllers/HolidayController');

let findOneStub = sinon.stub(Holiday, 'findOne'),
  findStub = sinon.stub(Holiday, 'find'),
  createStub = sinon.stub(Holiday, 'create'),
  findOneAndUpdateStub = sinon.stub(Holiday, 'findOneAndUpdate'),
  deleteOneStub = sinon.stub(Holiday, 'deleteOne'),
  randomDate = faker.date.future(100);

describe('Holidays Service Tests', () => {
  const holidayService = new HolidayService(),
    username = faker.name.fullName();

  describe('List Holidays', () => {
    it('return all holidays', async function () {
      const fakeHolidays = [
        {
          _id: faker.database.mongodbObjectId(),
          user: username,
          name: faker.name.firstName(),
          fixedWeekDay: 1
        },
        {
          _id: faker.database.mongodbObjectId(),
          user: username,
          name: faker.name.firstName(),
          timeStart: new Date(randomDate.setMonth(3)),
          timeEnd: new Date(randomDate.setMonth(5))
        }
      ];

      findStub.returns(fakeHolidays);
      const holidays = await holidayService.getAll(username);

      expect(holidays).to.have.lengthOf(2);
      expect(holidays[0]._id).to.equal(fakeHolidays[0]._id);
      expect(holidays[1]._id).to.equal(fakeHolidays[1]._id);
      expect(holidays[0].name).to.equal(fakeHolidays[0].name);
      expect(holidays[1].name).to.equal(fakeHolidays[1].name);
      expect(holidays[0].fixedWeekDay).to.equal(1);
      expect(holidays[1].timeStart).to.equal(fakeHolidays[1].timeStart);
      expect(holidays[1].timeEnd).to.equal(fakeHolidays[1].timeEnd);
    });
  });

  describe('Single Holiday', () => {
    it('return an holiday by id', async function () {
      const fakeHoliday = {
        _id: faker.database.mongodbObjectId(),
        user: username,
        name: faker.name.firstName(),
        fixedWeekDay: 1
      };

      findOneStub.returns(fakeHoliday);
      const holiday = await holidayService.getOne(fakeHoliday._id, username);

      expect(holiday._id).to.equal(fakeHoliday._id);
      expect(holiday.name).to.equal(fakeHoliday.name);
      expect(holiday.fixedWeekDay).to.equal(fakeHoliday.fixedWeekDay);
    });

    it('throw an not found error if id does not match', async function () {
      findOneStub.returns(null);

      const id = faker.database.mongodbObjectId();

      let err;
      try {
        await holidayService.getOne(id, username);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Holiday does not exist');
      expect(err.status).to.equal(404);
    });
  });

  describe('Create an Holiday', () => {
    it('create an holiday', async function () {
      const fakeHoliday = {
        _id: faker.database.mongodbObjectId(),
        user: username,
        name: faker.name.firstName(),
        fixedWeekDay: 1
      };

      createStub.returns(fakeHoliday);
      const holiday = await holidayService.createOne(username, fakeHoliday);

      expect(holiday._id).to.equal(fakeHoliday._id);
      expect(holiday.name).to.equal(fakeHoliday.name);
      expect(holiday.fixedWeekDay).to.equal(1);
    });

    it('not authenticated user can not create a new holiday', async function () {
      const fakeHoliday = {
        _id: faker.database.mongodbObjectId(),
        user: username,
        name: faker.name.firstName(),
        fixedWeekDay: 1
      };

      let err;
      try {
        await holidayService.createOne(null, fakeHoliday);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Unauthorized');
      expect(err.status).to.equal(401);
    });
  });

  describe('Update an Holiday', () => {
    it('update an holiday', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeHoliday = {
          _id: id,
          user: username,
          name: faker.name.firstName(),
          fixedWeekDay: 1
        };

      findOneStub.returns(fakeHoliday);
      findOneAndUpdateStub.returns(fakeHoliday);
      const holiday = await holidayService.updateOne(id, username, fakeHoliday);

      expect(holiday._id).to.equal(id);
      expect(holiday.name).to.equal(fakeHoliday.name);
      expect(holiday.fixedWeekDay).to.equal(1);
    });

    it('throw error if holiday does not exist', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeHoliday = {
          _id: id,
          user: username,
          name: faker.name.firstName(),
          fixedWeekDay: 1
        };

      findOneStub.returns(null);

      let err;
      try {
        await holidayService.updateOne(id, username, fakeHoliday);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Holiday does not exist');
      expect(err.status).to.equal(404);
    });
  });

  describe('Delete an Holiday', () => {
    it('delete an holiday', async function () {
      const id = faker.database.mongodbObjectId(),
        fakeHoliday = {
          _id: id,
          user: username,
          name: faker.name.firstName(),
          fixedWeekDay: 1
        };

      findOneStub.returns(fakeHoliday);
      deleteOneStub.returns(undefined);
      const holiday = await holidayService.deleteOne(id, username);

      expect(holiday).to.be.undefined;
    });

    it('throw error if holiday does not exist', async function () {
      const id = faker.database.mongodbObjectId();

      findOneStub.returns(null);

      let err;
      try {
        await holidayService.deleteOne(id, username);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.equal('Holiday does not exist');
      expect(err.status).to.equal(404);
    });
  });
});

describe('Holidays Controller Tests', () => {
  let req,
    res,
    id = faker.database.mongodbObjectId(),
    username = faker.name.fullName(),
    holidayController = new HolidayController();

  beforeEach(() => {
    res = { send: function () {} };
  });

  it('return a list of holidays', async function () {
    const fakeHolidays = [
      {
        _id: faker.database.mongodbObjectId(),
        user: username,
        name: faker.name.firstName(),
        fixedWeekDay: 1
      },
      {
        _id: faker.database.mongodbObjectId(),
        user: username,
        name: faker.name.firstName(),
        timeStart: new Date(randomDate.setMonth(3)),
        timeEnd: new Date(randomDate.setMonth(5))
      }
    ];

    req = { params: { user: username } };
    findStub.returns(fakeHolidays);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeHolidays,
      message: 'Fetched successfully'
    });
    await holidayController.getUserHolidays(req, res);

    mock.verify();
  });

  it('return a single holiday by exact id', async function () {
    const fakeHoliday = {
      _id: id,
      user: username,
      name: faker.name.firstName(),
      fixedWeekDay: 1
    };

    req = { params: { user: username, id } };
    findOneStub.returns(fakeHoliday);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeHoliday,
      message: 'Fetched successfully'
    });
    await holidayController.getUserHoliday(req, res);

    mock.verify();
  });

  it('create a new fixed-day holiday', async function () {
    const fakeHoliday = {
      _id: faker.database.mongodbObjectId(),
      user: username,
      name: faker.name.firstName(),
      fixedWeekDay: 1
    };

    req = { body: fakeHoliday, params: { user: username } };
    createStub.returns(fakeHoliday);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeHoliday,
      message: 'Created successfully'
    });
    await holidayController.createFixedWeekDayHoliday(req, res);

    mock.verify();
  });

  it('create a new ranged-days holiday', async function () {
    const fakeHoliday = {
      _id: faker.database.mongodbObjectId(),
      user: username,
      name: faker.name.firstName(),
      timeStart: new Date(randomDate.setMonth(3)),
      timeEnd: new Date(randomDate.setMonth(5))
    };

    req = { body: fakeHoliday, params: { user: username } };
    createStub.returns(fakeHoliday);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeHoliday,
      message: 'Created successfully'
    });
    await holidayController.createRangedDaysHoliday(req, res);

    mock.verify();
  });

  it('update an holiday', async function () {
    const fakeHoliday = {
      _id: id,
      user: username,
      name: faker.name.firstName(),
      fixedWeekDay: 1
    };

    req = { body: fakeHoliday, params: { id, user: username } };
    findOneStub.returns(fakeHoliday);
    findOneAndUpdateStub.returns(fakeHoliday);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeHoliday,
      message: 'Updated successfully'
    });
    await holidayController.updateHoliday(req, res);

    mock.verify();
  });

  it('delete an holiday', async function () {
    const fakeHoliday = {
      _id: id,
      user: username,
      name: faker.name.firstName(),
      fixedWeekDay: 1
    };

    req = { params: { id, user: username } };
    findOneStub.returns(fakeHoliday);
    deleteOneStub.returns(undefined);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({ message: 'Deleted successfully' });
    await holidayController.deleteHoliday(req, res);

    mock.verify();
  });
});
