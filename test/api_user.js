process.env.NODE_ENV = 'test';
let Event = require('../src/models/Event');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('User', (done) => {
    // beforeEach((done) => {
    //     Event.remove({}, (err) => {
    //         done();
    //     });
    // });
    /*
    * testing get route
    */
    describe('run all tests', () => {
        it('it should start running tests of user', (done) => {
            console.log('Working');
            done();
        });
    });
   
});
