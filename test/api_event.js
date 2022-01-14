process.env.NODE_ENV = 'test';
let Event = require('../src/models/Event');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Events', (done) => {
    // beforeEach((done) => {
    //     Event.remove({}, (err) => {
    //         done();
    //     });
    // });
    /*
    * testing get route
    */
    describe('run all tests', () => {
        it('it should start running tests', (done) => {
            console.log('Working');
            done();
        });
    });
    /*
    * testing get route
    */
    describe('/get All Events', () => {
        it("it should GET all the Events", (done) => {
            console.log('Working');
            done();
        });
    });
    /*
    * testing post route
    */
    describe('/post Event', () => {
        it("it should POST an Event", (done) => {
            console.log('Working');
            done();
        });
    });
    

    /*
  * testing get one route
  */
    // describe('/get/:id Event', () => {
    //     it('it should GET an event by id', (done) => {
    //         let ev = {
    //             name: "Test Event",
    //             description: "None",
    //             type: "normal",
    //         }
    //         let event = new Event(ev);
    //         event.save((err, eve) => {
    //             chai.request(app)
    //                 .get('/event/' + eve.id)
    //                 .send(eve)
    //                 .end(function (err, res) {
    //                     if (err) done(err);
    //                     res.should.have.status(200);
    //                     // res.body.should.be.a('object');
    //                     // res.body.should.have.property('data');
    //                     done();
    //                 })
    //         });

    //     });
    // });

    /*
  * testing the patch/modify route
  */
    // describe('/patch/:id Event', () => {
    //     it('it should PATCH( MODIFY) an event', (done) => {
    //         let ev = {
    //             name: "Test Event",
    //             description: "None",
    //             type: "normal",
    //         }
    //         let event = new Event(ev);
    //         event.save((err, event) => {
    //             chai.request(app)
    //                 .patch('/event/' + event.id)
    //                 .send(ev)
    //                 .end(function (err, res) {
    //                     if (err) done(err);
    //                     res.should.have.status(200);
    //                     // res.body.should.be.a('object');
    //                     // res.body.should.have.property('message');
    //                     done();
    //                 })
    //         });
    //     });
    // });
    /*
      * testing the delete route
      */
    // describe('/delete/:id Event', () => {
    //     it('it should DELETE an event', (done) => {
    //         let ev = {
    //             name: "Test Event",
    //             description: "None",
    //             type: "normal",
    //         }
    //         let event = new Event(ev);
    //         event.save((err, event) => {
    //             chai.request(app)
    //                 .delete('/event/' + event.id)
    //                 .end(function (err, res) {
    //                     if (err) done(err);
    //                     res.should.have.status(200);
    //                     res.body.should.be.a('object');
    //                     res.body.should.have.property('message');
    //                     done();
    //                 })
    //         });
    //     });
    // });

});
