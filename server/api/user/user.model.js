'use strict';

var mongoose = require('mongoose-q')();
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'premium'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  birthday: Date,
  facebook: {},
  twitter: {},
  google: {},
  github: {},
  completed: Boolean,
  kind: String,
  hometown: String,
  player:{},
  coach:{},
  team:{},
  founded: Date,
  stadium: String,
  league:{},
  headCoach: [{
      user: {
          type: mongoose.Schema.Types.ObjectId, ref: 'User'
      },
      _id: false
  }],
  athleticDirector: [{
      user: {
          type: mongoose.Schema.Types.ObjectId, ref: 'User'
      },
      _id: false
  }],
  president: [{
      user: {
          type: mongoose.Schema.Types.ObjectId, ref: 'User'
      },
      _id: false
  }],
  fan:{},
  profilePhoto: {
    type: String,
    default: 'user.png'
  },
  photos:[{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}],
  events:[],
  notification:[
    {
      kind : String,
      date: { type: Date, default: Date.now},
      data : {},
      _id: false
    }
  ],
  newNotification:[
    {
      kind: String,
      date: { type: Date, default: Date.now},
      data: {},
      _id: false
    }
  ],
  messages:[{
    read : Boolean,
    messagePrefix: String,
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    room: {type: mongoose.Schema.Types.ObjectId},
    thread: {type: mongoose.Schema.Types.ObjectId},
    date: { type: Date, default: Date.now}
  }],
  sport: String,
  sex: String,
  country: String,
  bio:  String,
  trackedBy: [{user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, date: Date}],
  statsAdmins: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  rosterAdmins: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  managesStats: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  managesRoster: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  invited: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  invitation: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  follows: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  followed: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  assigned: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      },
      dateFrom: Date,
      dateTo: Date,
      isPresent:Boolean,
      position: String,
      _id: false
    }
  ],
  assignedTo: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      },
      dateFrom: Date,
      dateTo: Date,
      isPresent:Boolean,
      position: String,
      _id: false
    }
  ],
  assignRequests:[
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      },
      dateFrom: Date,
      dateTo: Date,
      isPresent:Boolean,
      position: String,
      _id: false
    }
  ],
  favouriteJobs: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Job'
    }
  ],
  settings:{}
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'firstName': this.firstName,
      'lastName' : this.lastName,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
