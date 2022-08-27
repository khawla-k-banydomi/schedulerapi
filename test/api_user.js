process.env.NODE_ENV = 'test';

const { faker } = require('@faker-js/faker');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const User = require('../src/models/User');
const UserService = require('../src/services/UserService');
const UserController = require('../src/controllers/UserController');

let findOneStub = sinon.stub(User, 'findOne'),
  createStub = sinon.stub(User, 'create');

describe('Users Service Tests', () => {
  const userService = new UserService(),
    username = faker.name.fullName();

  it('return single user', async function () {
    const fakeUser = {
      _id: faker.database.mongodbObjectId(),
      name: username
    };

    findOneStub.returns(fakeUser);
    const user = await userService.getOne(username);

    expect(user._id).to.equal(fakeUser._id);
    expect(user.name).to.equal(fakeUser.name);
  });

  it('create a new user', async function () {
    const fakeUser = {
      _id: faker.database.mongodbObjectId(),
      name: username
    };

    createStub.returns(fakeUser);
    const user = await userService.createOne(fakeUser);

    expect(user._id).to.equal(fakeUser._id);
    expect(user.name).to.equal(fakeUser.name);
  });
});

describe('Users Controller Tests', () => {
  let req,
    res,
    id = faker.database.mongodbObjectId(),
    username = faker.name.fullName(),
    userController = new UserController();

  beforeEach(() => {
    res = { send: function () {} };
  });

  it('return the user profile', async function () {
    const fakeUser = {
      _id: id,
      name: faker.name.firstName()
    };

    req = { params: { user: username } };
    findOneStub.returns(fakeUser);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeUser,
      message: 'Fetched successfully'
    });
    await userController.getOneUser(req, res);

    mock.verify();
  });

  it('register a new user', async function () {
    const fakeUser = {
      _id: faker.database.mongodbObjectId(),
      user: username,
      name: faker.name.firstName()
    };

    req = { body: fakeUser };
    createStub.returns(fakeUser);
    const mock = sinon.mock(res);
    mock.expects('send').once().withExactArgs({
      data: fakeUser,
      message: 'Registered successfully'
    });
    await userController.register(req, res);

    mock.verify();
  });
});
