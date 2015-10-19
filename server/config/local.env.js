'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://188.166.92.111:9000',
  SESSION_SECRET: "abroadathletes-secret",

  FACEBOOK_ID: '802485543181564',
  FACEBOOK_SECRET: '37dfa90e5825a5998b20ca5ea03dd3b5',

  TWITTER_ID: 'app-id',
  TWITTER_SECRET: 'secret',

  GOOGLE_ID: 'app-id',
  GOOGLE_SECRET: 'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
