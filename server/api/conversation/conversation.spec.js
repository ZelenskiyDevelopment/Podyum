'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var Conversation = require('./conversation.model');
var Q = require('q');
var _ = require('lodash');
var db = require('../../test-utils/db.utils');
var cookie0;
var token0;

var cookie1;
var token1;

var user0 = {
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
};

var user1 = {
  provider: 'local',
  name: 'Fake User1',
  email: 'test1@test1.com',
  password: 'password1'
};

var user2 = {
  provider: 'local',
  name: 'Fake User2',
  email: 'test2@test2.com',
  password: 'password2'
};

describe('Conversations tests', function () {
  before(function (done) {
    db.dropCollections([User, Conversation]).then(function () {
      var promises = [
        db.addObjectToDB(User, user0),
        db.addObjectToDB(User, user1),
        db.addObjectToDB(User, user2)
      ];

      Q.all(promises).then(function (results) {
        user0 = results[0];
        user1 = results[1];
        user2 = results[2];

        var conversation = {
          members: [user0._id, user1._id],
          messages: [{
            author: user0._id,
            content: 'aaa'
          }]
        };

        return db.addObjectToDB(Conversation, conversation);
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
        cookie0 = res.headers['set-cookie'];
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
        cookie1 = res.headers['set-cookie'];
        token1 = 'Bearer ' + res.body.token;
        done();
      });
  });

  describe('GET /conversations', function () {
    it('should reject with 401', function (done) {
      request(app)
        .get('/api/conversations')
        .expect(401)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with not empty JSON array', function (done) {
      request(app)
        .get('/api/conversations')
        .set('cookie', cookie0)
        .set('Authorization', token0)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array).and.should.be.not.empty;
          done();
        });
    });

    it('should respond with empty JSON array', function (done) {
      request(app)
        .get('/api/conversations')
        .set('cookie', cookie1)
        .set('Authorization', token1)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array).and.should.be.not.empty;
          done();
        });
    });
  });


  describe('POST /conversations', function () {
    before(function (done) {
      db.dropCollections([Conversation]).then(function () {
        done();
      });
    });

    afterEach(function (done) {
      db.dropCollections([Conversation]).then(function () {
        done();
      });
    });

    it('should reject with 401', function (done) {
      request(app)
        .post('/api/conversations')
        .expect(401)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should create new conversation with two given members', function (done) {
      var conversation = {
        members: [user0._id, user1._id],
        messages: [{
          author: user0._id,
          content: 'aaa'
        }]
      };

      request(app)
        .post('/api/conversations')
        .set('cookie', cookie0)
        .set('Authorization', token0)
        .send(conversation)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object).and.should.be.not.empty;
          res.body.members.should.be.instanceof(Array);
          res.body.members.should.have.length(2);
          res.body.messages.should.be.instanceof(Array);
          res.body.messages.should.have.length(1);
          done();
        });
    });

    it('should create new conversation with one given member (without author)', function (done) {
      var conversation = {
        members: [user1._id],
        messages: [{
          author: user0._id,
          content: 'aaa'
        }]
      };

      request(app)
        .post('/api/conversations')
        .set('cookie', cookie0)
        .set('Authorization', token0)
        .send(conversation)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object).and.should.be.not.empty;
          res.body.members.should.be.instanceof(Array);
          res.body.members.should.have.length(2);
          res.body.messages.should.be.instanceof(Array);
          res.body.messages.should.have.length(1);
          done();
        });
    });

  });

  describe('GET /conversations/:id/messages', function () {
    var conversationId;
    before(function (done) {
      var conversation = {
        members: [user0._id, user2._id],
        messages: [{
          author: user0._id,
          content: 'aaa'
        }, {
          author: user2._id,
          content: 'bbb'
        }]
      };

      db.addObjectToDB(Conversation, conversation).then(function (result) {
        conversationId = result._id;
        done();
      });
    });

    it('should reject with 401', function (done) {
      request(app)
        .get('/api/conversations/' + conversationId + '/messages')
        .expect(401)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with not empty JSON array', function (done) {
    request(app)
      .get('/api/conversations/' + conversationId + '/messages')
      .set('cookie', cookie0)
      .set('Authorization', token0)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array).and.should.be.not.empty;
        res.body.should.have.length(2);
        done();
      });
  });

    it('should respond with empty JSON array', function (done) {
      request(app)
        .get('/api/conversations/' + conversationId + '/messages')
        .set('cookie', cookie1)
        .set('Authorization', token1)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          res.body.should.be.empty;
          done();
        });
    });
});


describe('POST /conversations/id/message', function () {

  it('should reject with 401', function (done) {
    request(app)
      .get('/api/conversations')
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
})
;

