'use strict';

var should = require('should');
var app = require('../../../app');
var request = require('supertest');
var User = require('../user.model');
var Q = require('q');
var _ = require('lodash');
var db = require('../../../test-utils/db.utils');

var token0;
var token1;

var user0 = {
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password',
  settings: {}
};

var user1 = {
  provider: 'local',
  name: 'Fake User1',
  email: 'test1@test1.com',
  password: 'password1',
  settings: {a: true, b: false}
};

describe('User live-stats-banner-settings tests', function () {
  before(function (done) {
    db.dropCollections([User]).then(function () {
      var promises = [
        db.addObjectToDB(User, user0),
        db.addObjectToDB(User, user1)
      ];

      return Q.all(promises).then(function (results) {
        user0 = results[0];
        user1 = results[1];
      }).then(function () {
        done();
      }).catch(function (err) {
        done(err);
      });
    });
  });

  it('should authenticate user0', function (done) {
    request(app)
      .post('/auth/local')
      .send({email: "test@test.com", password: 'password'})
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        token0 = 'Bearer ' + res.body.token;
        done();
      });
  });

  it('should authenticate user1', function (done) {
    request(app)
      .post('/auth/local')
      .send({email: "test1@test1.com", password: 'password1'})
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        token1 = 'Bearer ' + res.body.token;
        done();
      });
  });

  describe('GET /api/user/settings', function () {
    it('should reject with 401', function (done) {
      request(app)
        .get('/api/users/settings')
        .expect(401)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with empty object', function (done) {
      request(app)
        .get('/api/users/settings')
        .set('Authorization', token0)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.should.be.empty;
          done();
        });
    });

    it('should respond with not empty object', function (done) {
      request(app)
        .get('/api/users/settings')
        .set('Authorization', token1)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.should.not.be.empty;
          res.body.a.should.equal(true);
          res.body.b.should.equal(false);
          done();
        });
    });
  });


  describe('POST /api/users/settings', function () {
    it('should reject with 401', function (done) {
      request(app)
        .post('/api/users/settings')
        .expect(401)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should save settings in user.settings', function (done) {
      var settings = {
        x: true
      };

      request(app)
        .post('/api/users/settings')
        .set('Authorization', token0)
        .send(settings)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.should.not.be.empty;
          res.body.x.should.equal(true);
          done();
        });
    });

    it('should override settings in user.settings', function (done) {
      var settings = {
        x: true
      };

      request(app)
        .post('/api/users/settings')
        .set('Authorization', token1)
        .send(settings)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.should.not.be.empty;
          res.body.x.should.equal(true);
          should.not.exist(res.body.b);
          should.not.exist(res.body.a);
          done();
        });
    });
  });
});
