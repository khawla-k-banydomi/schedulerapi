process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
const User = require('../src/models/User');
let expect = chai.expect;

chai.use(chaiHttp);

describe('Users integration tests', () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  it('GET single user', async function () {
    const username = 'username';
    const user = {
      name: username
    };
    await User.create(user);

    const res = await chai.request(app).get(`/user/${username}`);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Fetched successfully');
    expect(res.body.data.name).to.be.equals(user.name);
  });

  it('CREATE user', async function () {
    const username = 'username';

    const body = {
      name: username
    };

    const res = await chai.request(app).post('/user').send(body);

    expect(res.status).to.be.equals(200);
    expect(res.body.message).to.be.equals('Registered successfully');
    expect(res.body.data.name).to.be.equals(body.name);
  });
});
