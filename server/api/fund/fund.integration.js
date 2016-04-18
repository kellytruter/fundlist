'use strict';

var app = require('../..');
import request from 'supertest';

var newFund;

//describe('Fund API:', function() {
//
//  describe('GET /api/funds', function() {
//    var funds;
//
//    beforeEach(function(done) {
//      request(app)
//        .get('/api/funds')
//        .expect(200)
//        .expect('Content-Type', /json/)
//        .end((err, res) => {
//          if (err) {
//            return done(err);
//          }
//          funds = res.body;
//          done();
//        });
//    });
//
//    it('should respond with JSON array', function() {
//      funds.should.be.instanceOf(Array);
//    });
//
//  });
//
//  describe('GET /api/funds/:id', function() {
//    var fund;
//
//    beforeEach(function(done) {
//      request(app)
//        .get('/api/funds/' + newFund._id)
//        .expect(200)
//        .expect('Content-Type', /json/)
//        .end((err, res) => {
//          if (err) {
//            return done(err);
//          }
//          fund = res.body;
//          done();
//        });
//    });
//
//    afterEach(function() {
//      fund = {};
//    });
//
//    it('should respond with the requested fund', function() {
//      fund.name.should.equal('New Fund');
//      fund.info.should.equal('This is the brand new fund!!!');
//    });
//
//  });
//
//});
