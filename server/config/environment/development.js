'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/abroadathletes-dev'
  },
  redis: {
    port:6379,
    host:'127.0.0.1'
  },
  seedDB: true
};
