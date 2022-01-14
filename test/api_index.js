process.env.NODE_ENV = 'test';
let Event = require('../src/models/Event');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Index Route', (done) => {
    // beforeEach((done) => {
    //     Event.remove({}, (err) => {
    //         done();
    //     });
    // });
    /*
    * testing get route
    */
    describe('run all tests', () => {
        it('it should start running tests in index', (done) => {
            console.log('Working');
            done();
        });
    });
});
